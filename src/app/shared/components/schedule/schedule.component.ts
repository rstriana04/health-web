import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { isSameDay, isSameMonth } from 'date-fns';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppointmentsService } from '../../../core/home/appointments/services/appointments.service';
import { StaffScheduleService } from '../../../core/staff/services/staff-schedule.service';
import {
  AddDateSelected,
  AddScheduleSelected,
  AttemptLoadStaffSchedules,
  RemoveSchedule
} from '../../../core/staff/store/actions/staff-schedules.actions';
import { AppState } from '../../../store/reducers/app.reducer';
import { PopupDeleteConfirmationComponent } from '../popup-delete-confirmation/popup-delete-confirmation.component';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#fae3e3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#d1e8ff'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#fdf1ba'
  }
};

@Component({
  selector: 'health-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;
  events$: Observable<any[]> = of([]);
  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };
  actions: CalendarEventAction[] = [
    {
      label: 'Delete',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.deleteEvent(event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();
  activeDayIsOpen = true;

  constructor(
    private store: Store<AppState>,
    private staffScheduleService: StaffScheduleService,
    private toastService: ToastrService,
    private matDialog: MatDialog
  ) { }

  dayClicked(event): void {
    const scheduleEvent = {
      ...event.day,
      date: event.day.date.toISOString(),
      events: event.day.events.map(e => {
        return {
          ...e,
          start: e.start.toISOString(),
          end: e.end.toISOString()
        };
      })
    };
    if ( isSameMonth(event.day.date, this.viewDate) ) {
      if (
        ( isSameDay(this.viewDate, event.day.date) && this.activeDayIsOpen === true ) ||
        event.day.events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = event.day.date;
    }
    const date = moment(event.day.date).format('YYYY-MM-DD');
    this.store.dispatch(AddDateSelected({ dateSelected: date }));
    this.store.dispatch(AddScheduleSelected({ schedule: scheduleEvent }));
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    const dialogRef = this.matDialog.open(PopupDeleteConfirmationComponent, {
      width: '256px'
    });
    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.staffScheduleService.deleteSchedule(parseInt(eventToDelete.id.toString(), 0)).subscribe(() => {
          this.store.dispatch(RemoveSchedule({ id: parseInt(eventToDelete.id.toString(), 0) }));
          this.toastService.success(`Successfully delete schedule`, '¡Success!', {
            closeButton: true,
            timeOut: 9000,
            progressAnimation: 'decreasing',
            progressBar: true
          });
        }, error => {
          this.toastService.error('Failed delete schedule', '¡Oops, error!', {
            closeButton: true,
            timeOut: 9000,
            progressAnimation: 'decreasing',
            progressBar: true
          });
          console.error(error);
        });
      }
    })
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  ngOnInit(): void {
    this.store.dispatch(AttemptLoadStaffSchedules());
    this.events$ = this.staffScheduleService.getScheduleByStaffFromStore().pipe(
      map(schedules => {
        return schedules.map((schedule, index) => {
          return {
            ...schedule,
            title: `Turn ${ ++index }`,
            draggable: false,
            resizable: {
              beforeStart: false,
              afterEnd: false
            },
            start: new Date(`${ schedule.date } ${ schedule.timeFrom }`),
            end: new Date(`${ schedule.date } ${ schedule.timeUntil }`),
            actions: this.actions,
            color: colors.blue
          };
        });
      })
    );
    this.refresh.next();
  }
}

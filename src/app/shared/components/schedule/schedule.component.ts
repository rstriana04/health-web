import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import * as moment from 'moment';
import { Observable, of, Subject } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
import { AppointmentsService } from '../../../core/home/appointments/services/appointments.service';
import { StaffScheduleService } from '../../../core/staff/services/staff-schedule.service';
import { AddScheduleSelected, AttemptLoadStaffSchedules } from '../../../core/staff/store/actions/staff-schedules.actions';
import { AppState } from '../../../store/reducers/app.reducer';

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
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {

      }
    }
  ];

  refresh: Subject<any> = new Subject();
  activeDayIsOpen = true;

  constructor(
    private store: Store<AppState>,
    private staffScheduleService: StaffScheduleService,
    private appointmentService: AppointmentsService
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
    this.store.dispatch(AddScheduleSelected({ schedule: scheduleEvent }));
    // if (isSameMonth(date, this.viewDate)) {
    //   if (
    //     (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
    //     events.length === 0
    //   ) {
    //     this.activeDayIsOpen = false;
    //   } else {
    //     this.activeDayIsOpen = true;
    //   }
    //   this.viewDate = date;
    // }
  }

  eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {

  }

  handleEvent(action: string, event: CalendarEvent): void {
  }

  addEvent(): void {
  }

  deleteEvent(eventToDelete: CalendarEvent) {

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
      switchMap(schedules => this.appointmentService.getAllAppointmentsFromStore().pipe(
        first(),
        map(appointments => {
          return schedules.map((schedule, index) => {
            return {
              title: `Turn ${ ++index }`,
              draggable: true,
              resizable: {
                beforeStart: true,
                afterEnd: true
              },
              start: new Date(`${ schedule.date } ${ schedule.timeFrom }`),
              end: new Date(`${ schedule.date } ${ schedule.timeUntil }`),
              actions: this.actions,
              color: colors.blue,
              appointments: appointments.filter(
                appointment => moment(appointment.citation).format('YYYY-MM-DD') === moment(schedule.date).format('YYYY-MM-DD'))
            };
          });
        })
      ))
    );
    this.refresh.next();
  }
}

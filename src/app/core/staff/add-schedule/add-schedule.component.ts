import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { addDays, differenceInDays, format, getDay } from 'date-fns';
import { ToastrService } from 'ngx-toastr';

import { BehaviorSubject } from 'rxjs';
import { StaffScheduleService } from '../services/staff-schedule.service';

@Component({
  selector: 'health-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddScheduleComponent implements OnInit {
  formSchedule: FormGroup;
  daysSelected: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(
    private toastService: ToastrService,
    private staffScheduleService: StaffScheduleService
  ) { }

  ngOnInit(): void {
    this.initFormSchedule();
  }

  private initFormSchedule() {
    this.formSchedule = new FormGroup({
      dateFrom: new FormControl('', Validators.required),
      dateUntil: new FormControl('', Validators.required),
      interval: new FormControl('', Validators.required)
    });
  }

  public sendFormSchedule(formSchedule: FormGroup) {
    if ( formSchedule.valid && this.daysSelected.value.length ) {
      const dateFrom = new Date(formSchedule.value.dateFrom);
      const dateUntil = new Date(formSchedule.value.dateUntil);
      const interval = formSchedule.value.interval;
      const diffInDays = differenceInDays(dateUntil, dateFrom);
      const timeFrom = format(dateFrom, 'HH:mm:ss');
      const timeUntil = format(dateUntil, 'HH:mm:ss');
      if ( diffInDays > 30 ) {
        this.toastService.warning('¡The Difference in Days between dateFrom and dateUntil is higher that 30!', '¡Warning!', {
          progressBar: true,
          closeButton: true,
          progressAnimation: 'decreasing',
          timeOut: 9000
        });
      } else {
        let schedules = [];
        for ( let i = 0; i <= diffInDays; i++ ) {
          schedules.push({
            date: format(addDays(new Date(dateFrom), i), 'yyyy-MM-dd'),
            timeFrom,
            timeUntil,
            day: getDay(new Date(format(addDays(new Date(dateFrom), i), 'yyyy-MM-dd'))),
            interval
          });
        }
        const daysSelected = this.daysSelected.value.map(day => day.day);
        schedules = schedules.map(schedule => {
          return {
            ...schedule,
            valid: daysSelected.includes(schedule.day)
          };
        }).filter(day => day.valid);
        this.staffScheduleService.createSchedule(schedules).subscribe(response => {
          this.toastService.success('Schedule correctly assigned', '¡Success!', {
            timeOut: 9000,
            closeButton: true,
            progressAnimation: 'decreasing',
            progressBar: true
          });
        }, error => {
          this.toastService.error('An error occurred while assigning the schedule', '¡Error!', {
            timeOut: 9000,
            closeButton: true,
            progressAnimation: 'decreasing',
            progressBar: true
          });
          console.error(error);
        });
      }
    }
  }

  public setDaysSelected($event: any) {
    this.daysSelected.next($event);
  }
}

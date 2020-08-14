import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddScheduleComponent } from '../add-schedule/add-schedule.component';

@Component({
  selector: 'health-staff-schedule',
  templateUrl: './staff-schedule.component.html',
  styleUrls: ['./staff-schedule.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaffScheduleComponent implements OnInit {

  constructor(
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  public addSchedule() {
    this.matDialog.open(AddScheduleComponent, {
      width: '728px',
      height: 'auto'
    });
  }
}

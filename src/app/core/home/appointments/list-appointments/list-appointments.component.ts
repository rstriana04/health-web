import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'health-list-appointments',
  templateUrl: './list-appointments.component.html',
  styleUrls: ['./list-appointments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListAppointmentsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

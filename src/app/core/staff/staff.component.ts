import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'health-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaffComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

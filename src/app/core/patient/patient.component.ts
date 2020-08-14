import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'health-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

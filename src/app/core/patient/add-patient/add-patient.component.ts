import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'health-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddPatientComponent implements OnInit {
  public formAddPatient: FormGroup;

  constructor() {
    this.initFormAddPatient();
  }

  ngOnInit(): void {
  }

  private initFormAddPatient() {
    this.formAddPatient = new FormGroup({
      name: new FormControl(''),
      last_name: new FormControl(''),
      phone: new FormControl('')
    });
  }

  public sendFormAddPatient(formAddPatient: FormGroup) {

  }
}

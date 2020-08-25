import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'health-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddPatientComponent implements OnInit {
  public formAddPatient: FormGroup;

  constructor(
    private toastService: ToastrService,
    private patientService: PatientService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.initFormAddPatient();
  }

  ngOnInit(): void {
    if ( this.data && Object.keys(this.data).length ) {
      const patientReceived = {
        ...this.data,
        id: undefined,
        user: undefined,
        createdAt: undefined,
        updatedAt: undefined
      };
      delete patientReceived.id;
      delete patientReceived.user;
      delete patientReceived.createdAt;
      delete patientReceived.updatedAt;
      this.formAddPatient.setValue(patientReceived);
      this.formAddPatient.disable({ onlySelf: true, emitEvent: true });
    }
  }

  private initFormAddPatient() {
    this.formAddPatient = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      lastName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      phone: new FormControl('', Validators.compose([Validators.required, Validators.minLength(10)])),
      gender: new FormControl('', Validators.compose([Validators.required])),
      dateBirth: new FormControl('', Validators.compose([Validators.required]))
    });
  }

  public sendFormAddPatient(formAddPatient: FormGroup) {
    if ( formAddPatient.valid ) {
      if ( this.data && Object.keys(this.data).length ) {
        const dateBirth = typeof formAddPatient.value.dateBirth === 'string'
                          ? formAddPatient.value.dateBirth
                          : formAddPatient.value.dateBirth.toISOString();
        const patient = { ...this.data, ...formAddPatient.value, dateBirth };
        this.patientService.updatePatient(patient).subscribe(() => {
          this.toastService.success(`Successfully update patient`, '¡Success!', {
            closeButton: true,
            timeOut: 9000,
            progressAnimation: 'decreasing',
            progressBar: true
          });
        }, error => {
          this.toastService.error('Failed update patient', '¡Oops, error!', {
            closeButton: true,
            timeOut: 9000,
            progressAnimation: 'decreasing',
            progressBar: true
          });
          console.error(error);
        });
      } else {
        const patient = { ...formAddPatient.value, dateBirth: formAddPatient.value.dateBirth.toISOString() };
        this.patientService.createPatient(patient).subscribe(() => {
          this.toastService.success(`Successfully created patient`, '¡Success!', {
            closeButton: true,
            timeOut: 9000,
            progressAnimation: 'decreasing',
            progressBar: true
          });
          this.formAddPatient.reset();
        }, error => {
          this.toastService.error('Failed created patient', '¡Oops, error!', {
            closeButton: true,
            timeOut: 9000,
            progressAnimation: 'decreasing',
            progressBar: true
          });
          console.error(error);
        });
      }
    }
  }

  public updateForm($event: MatCheckboxChange) {
    if ( $event.checked ) {
      this.formAddPatient.enable({ emitEvent: true, onlySelf: true });
    } else {
      this.formAddPatient.disable({ emitEvent: true, onlySelf: true });
    }
  }
}

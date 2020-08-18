import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    private patientService: PatientService
  ) {
    this.initFormAddPatient();
  }

  ngOnInit(): void {
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

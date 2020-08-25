import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { PopupDeleteConfirmationComponent } from '../../../shared/components/popup-delete-confirmation/popup-delete-confirmation.component';
import { AppState } from '../../../store/reducers/app.reducer';
import { AddPatientComponent } from '../add-patient/add-patient.component';
import { PatientService } from '../services/patient.service';
import { AttemptLoadAllPatients, RemovePatient } from '../store/actions/patient.actions';

@Component({
  selector: 'health-list-patients',
  templateUrl: './list-patients.component.html',
  styleUrls: ['./list-patients.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListPatientsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'lastName', 'phone', 'gender', 'dateBirth', 'update', 'delete'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  public formSearchPatient: FormGroup;

  constructor(
    private matDialog: MatDialog,
    private patientService: PatientService,
    private store: Store<AppState>,
    private toastService: ToastrService
  ) {

  }

  ngOnInit(): void {
    this.store.dispatch(AttemptLoadAllPatients());
    this.patientService.getPatientsByStaffFromStore().subscribe(patients => {
      this.dataSource = new MatTableDataSource(patients);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = ( event.target as HTMLInputElement ).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if ( this.dataSource.paginator ) {
      this.dataSource.paginator.firstPage();
    }
  }

  public addPatient() {
    this.matDialog.open(AddPatientComponent, {
      width: '400px',
      height: 'auto'
    });
  }

  public updatePatient(row: any) {
    this.matDialog.open(AddPatientComponent, {
      width: '400px',
      height: 'auto',
      data: { ...row }
    });
  }

  public deletePatient(row: any) {
    const dialogRef = this.matDialog.open(PopupDeleteConfirmationComponent, {
      width: '250px'
    });
    dialogRef.afterClosed().subscribe(response => {
      console.log(response);
      if ( response ) {
        this.patientService.deletePatient(row.id).subscribe(success => {
          this.store.dispatch(RemovePatient({ id: row.id }));
          this.toastService.success(`Successfully delete patient`, '¡Success!', {
            closeButton: true,
            timeOut: 9000,
            progressAnimation: 'decreasing',
            progressBar: true
          });
        }, error => {
          this.toastService.error('¡An error occurred while deleting the patient, check for associated appointments!', '¡Oops, error!', {
            closeButton: true,
            timeOut: 9000,
            progressAnimation: 'decreasing',
            progressBar: true
          });
          console.error(error);
        });
      }
    });
  }
}

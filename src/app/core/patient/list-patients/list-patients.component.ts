import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/reducers/app.reducer';
import { AddPatientComponent } from '../add-patient/add-patient.component';
import { PatientService } from '../services/patient.service';
import { AttemptLoadAllPatients } from '../store/actions/patient.actions';

@Component({
  selector: 'health-list-patients',
  templateUrl: './list-patients.component.html',
  styleUrls: ['./list-patients.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListPatientsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'lastName', 'phone', 'gender', 'dateBirth', 'createdAt', 'updatedAt'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  public formSearchPatient: FormGroup;

  constructor(
    private matDialog: MatDialog,
    private patientService: PatientService,
    private store: Store<AppState>
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



}

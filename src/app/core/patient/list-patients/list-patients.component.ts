import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddPatientComponent } from '../add-patient/add-patient.component';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

/** Constants used to fill up our data base. */
const COLORS: string[] = [
  'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
  'aqua', 'blue', 'navy', 'black', 'gray'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

@Component({
  selector: 'health-list-patients',
  templateUrl: './list-patients.component.html',
  styleUrls: ['./list-patients.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListPatientsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'progress', 'color'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  public formSearchPatient: FormGroup;

  constructor(
    private matDialog: MatDialog
  ) {
    const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }

  ngOnInit(): void {
    this.initFormSearchPatient();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public sendFormSearchPatient(formSearchPatient: FormGroup) {
    if ( formSearchPatient.valid ) {
      console.log(formSearchPatient);
    }
  }

  private initFormSearchPatient() {
    this.formSearchPatient = new FormGroup({
      dni: new FormControl(''),
      name: new FormControl('')
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
      height: 'auto',
    });
  }
}

function createNewUser(id: number): UserData {
  const name = NAMES[Math.round(Math.random() * ( NAMES.length - 1 ))] + ' ' +
               NAMES[Math.round(Math.random() * ( NAMES.length - 1 ))].charAt(0) + '.';

  return {
    id: id.toString(),
    name,
    progress: Math.round(Math.random() * 100).toString(),
    color: COLORS[Math.round(Math.random() * ( COLORS.length - 1 ))]
  };

}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

export interface Week {
  day?: number;
  name: string;
  completed: boolean;
  color: ThemePalette;
  days?: Week[];
}

@Component({
  selector: 'health-select-days',
  templateUrl: './select-days.component.html',
  styleUrls: ['./select-days.component.scss']
})
export class SelectDaysComponent implements OnInit {
  @Output()
  daysSelected: EventEmitter<Week[]> = new EventEmitter<Week[]>();
  week: Week = {
    name: 'Days',
    completed: false,
    color: 'primary',
    days: [
      { name: 'Sunday', completed: false, color: 'primary', day: 0 },
      { name: 'Monday', completed: false, color: 'primary', day: 1 },
      { name: 'Tuesday', completed: false, color: 'primary', day: 2 },
      { name: 'Wednesday', completed: false, color: 'primary', day: 3 },
      { name: 'Thursday', completed: false, color: 'primary', day: 4 },
      { name: 'Friday', completed: false, color: 'primary', day: 5 },
      { name: 'Saturday', completed: false, color: 'primary', day: 6 }
    ]
  };

  allComplete = false;

  updateAllComplete() {
    this.allComplete = this.week.days != null && this.week.days.every(t => t.completed);
    this.daysSelected.emit(this.week.days.filter(day => day.completed));
  }

  someComplete(): boolean {
    if ( this.week.days == null ) {
      return false;
    }
    return this.week.days.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if ( this.week.days == null ) {
      return;
    }
    this.week.days.forEach(t => t.completed = completed);
    this.daysSelected.emit(this.week.days);
  }

  constructor() { }

  ngOnInit(): void {
  }

}

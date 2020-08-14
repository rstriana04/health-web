import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'health-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddScheduleComponent implements OnInit {

  task: Task = {
    name: 'Days',
    completed: false,
    color: 'primary',
    subtasks: [
      { name: 'Sunday', completed: false, color: 'primary' },
      { name: 'Monday', completed: false, color: 'primary' },
      { name: 'Tuesday', completed: false, color: 'primary' },
      { name: 'Wednesday', completed: false, color: 'primary' },
      { name: 'Thursday', completed: false, color: 'primary' },
      { name: 'Friday', completed: false, color: 'primary' },
      { name: 'Saturday', completed: false, color: 'primary' }
    ]
  };

  allComplete = false;

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if ( this.task.subtasks == null ) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if ( this.task.subtasks == null ) {
      return;
    }
    this.task.subtasks.forEach(t => t.completed = completed);
  }

  constructor() { }

  ngOnInit(): void {
  }

}

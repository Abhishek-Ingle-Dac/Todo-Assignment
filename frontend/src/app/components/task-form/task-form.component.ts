import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../models/task';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  @Input() task: Task = this.getEmptyTask();
  @Input() isEditMode: boolean = false;
  @Output() formClosed = new EventEmitter<void>();
  @Output() taskSaved = new EventEmitter<void>();

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    if (!this.task) {
      this.task = this.getEmptyTask();
    }
  }

  getEmptyTask(): Task {
    return {
      assignedTo: '',
      status: 'Not Started',
      dueDate: '',
      prority: 'Normal',
      comments: ''
    };
  }

  onSubmit(): void {
    if (this.isEditMode && this.task.id) {
      this.taskService.updateTask(this.task.id, this.task).subscribe(() => {
        this.taskSaved.emit();
        this.close();
      });
    } else {
      this.taskService.createTask(this.task).subscribe(() => {
        this.taskSaved.emit();
        this.close();
      });
    }
  }

  close(): void {
    this.formClosed.emit();
  }
}

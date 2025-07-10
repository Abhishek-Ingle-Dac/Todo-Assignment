import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../models/task';

@Component({
  selector: 'app-task-delete-confirm',
  templateUrl: './task-delete-confirm.component.html',
  styleUrls: ['./task-delete-confirm.component.css']
})
export class TaskDeleteConfirmComponent {
  @Input() task: Task | null = null;
  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  confirm(): void {
    this.confirmed.emit();
  }

  cancel(): void {
    this.cancelled.emit();
  }
}

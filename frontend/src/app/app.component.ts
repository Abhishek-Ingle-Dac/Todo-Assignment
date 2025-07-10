import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Task } from './components/models/task'; // adjust path if needed
import { TaskService } from './components/services/task.service'; // adjust path if needed
import { TaskDialogComponent } from './components/task-dialog/task-dialog.component'; // adjust path if needed

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['id', 'assignedTo', 'status', 'dueDate', 'prority', 'comments', 'actions'];

  dataSource = new MatTableDataSource<Task>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private taskService: TaskService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.dataSource.data = tasks;
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '400px',
      data: { mode: 'create' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'created') this.loadTasks();
    });
  }

  openUpdateDialog(task: Task): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '400px',
      data: { mode: 'update', task },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'updated') this.loadTasks();
    });
  }

  deleteTask(taskId: string): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(taskId).subscribe(() => this.loadTasks());
    }
  }
}

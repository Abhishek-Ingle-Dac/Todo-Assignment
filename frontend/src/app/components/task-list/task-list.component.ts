import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  searchText: string = '';
  currentPage: number = 1;
  pageSize: number = 4;
  selectedTask: Task | null = null;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.getAllTasks();
  }

  getAllTasks(): void {
    this.taskService.getTasks().subscribe((data) => {
      this.tasks = data;
    });
  }

  refreshTasks(): void {
    this.getAllTasks();
  }

  filteredTasks(): Task[] {
    let filtered = this.tasks.filter(task =>
      task.assignedTo.toLowerCase().includes(this.searchText.toLowerCase()) ||
      task.status.toLowerCase().includes(this.searchText.toLowerCase()) ||
      task.prority.toLowerCase().includes(this.searchText.toLowerCase()) ||
      task.comments.toLowerCase().includes(this.searchText.toLowerCase())
    );
    const start = (this.currentPage - 1) * this.pageSize;
    return filtered.slice(start, start + this.pageSize);
  }

  nextPage(): void {
    const maxPage = Math.ceil(this.tasks.length / this.pageSize);
    if (this.currentPage < maxPage) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  openNewTask(): void {
    this.selectedTask = null;
    
  }

  editTask(task: Task): void {
    this.selectedTask = { ...task };
    
  }

  confirmDelete(task: Task): void {
    const confirmed = confirm(`Do you want to delete task assigned to ${task.assignedTo}?`);
    if (confirmed && task.id) {
      this.taskService.deleteTask(task.id).subscribe(() => {
        this.getAllTasks();
      });
    }
  }
}

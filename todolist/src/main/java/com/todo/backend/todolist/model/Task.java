package com.todo.backend.todolist.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "tasks")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Task {
    @Id
    private String id; // Unique task ID (used in URLs, updates, deletes)

    private String assignedTo;
    private String status;
    private String dueDate;
    private String prority;
    private String comments;
}

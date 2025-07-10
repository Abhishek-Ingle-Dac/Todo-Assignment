package com.todo.backend.todolist.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.todo.backend.todolist.model.Task;

public interface TaskRepository extends MongoRepository<Task, String> {}
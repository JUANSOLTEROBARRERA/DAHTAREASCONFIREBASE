import { Component } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { Input, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Task } from '../models/task';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public tasks: Task[];
  public task: string;
  public currentTask: Task;

  public compTask: string[];
  @ViewChild('inputTask') myInput;

  constructor(private taskService: TasksService) {

    this.taskService.getTasks().subscribe(res => {
      this.tasks = res;
      console.log(this.tasks);
    });

    this.task = "Escribe una tarea"
    this.ionViewLoaded()
  }

  ionViewLoaded() {

    setTimeout(() => {
      this.myInput.setFocus();
    }, 150);

  }

  public addTask() {

    this.currentTask = {
      task: this.task,
      done: false
    }

    this.taskService.newTask(this.currentTask);

    //this.taskService.addTasks(this.task);
    //this.tasks=this.taskService.getTasks();
    //console.log(this.tasks);
    //this.task="";
  }

  public removeTask(pos: number) {
    //this.taskService.removeTask(pos);
    //this.tasks=this.taskService.getTasks();
  }

  public completeTask(pos: number) {
    //this.taskService.completeTask(pos);
    //this.tasks=this.taskService.getCompTask();
    //this.taskService.removeTask(pos);
    //.tasks=this.taskService.getTasks();
  }

  public updateTask(task: Task, id: string) {
    task.done = true;
    this.taskService.updateTask(task,id)
  }

  public removeTask2(id: string){
    this.taskService.removeTask2(id);
  }

}

import { Component } from '@angular/core';
import { Task } from '../models/task';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public tasks: Task[];

 constructor(private taskService:TasksService) {
    this.taskService.getTasks().subscribe(res => {
      this.tasks = res;
      console.log(this.tasks);
    });
    console.log(this.tasks)
  }

  public addTask(pos:number){
    
  }

  public updateTask(task: Task, id: string) {
    task.done = false;
    this.taskService.updateTask(task,id)
  }
}

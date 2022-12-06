import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore' 
import { Observable } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private tasks: string[] = [];
  private compTask: string[] = [];

  constructor(private firestore: AngularFirestore) {
    //this.tasks.push("Tarea 1");
    //this.tasks.push("Tarea 2");
   }

   public getTasks(): Observable<Task[]> {
      return this.firestore.collection('tasks').snapshotChanges().pipe(
         map(actions => {
           return actions.map (a=>{
               const data = a.payload.doc.data() as Task;
               const id = a.payload.doc.id;
               return { id, ...data };
           });
         })
       );
      //return this.tasks;
   }
   public getCompTask():string[] {
      return this.compTask;
   }

   public addTasks(task:string){
      this.tasks.push(task);
   }

   public removeTask(pos:number){
      this.tasks.splice(pos, 1);
   }
   public completeTask(pos:number){
      let taskslist = this.getTasks();
      let deltask = taskslist[pos];
      this.compTask.push(deltask);
   }
   public removeCompTask(pos:number){
      this.compTask.splice(pos, 1);
   }
   public completeTask2(pos:number){
      let taskslist = this.getCompTask();
      let deltask = taskslist[pos];
      this.tasks.push(deltask);
   }

   public newTask(task: Task){
      this.firestore.collection('tasks').add(task);
   }


   public updateTask(task: Task, id: string) {
      this.firestore.doc('tasks/' + id).update(task);
    }

    public removeTask2(id: string){
      this.firestore.collection('tasks').doc(id).delete();
    }
}

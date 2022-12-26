import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../modal/task';
@Injectable({
  providedIn: 'root'
})
export class CrudService {
  serviceURL: string = '';
  //inject http client
  constructor(private http: HttpClient) {
    this.serviceURL = 'http://localhost:3000/task';
  }
  //create
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.serviceURL, task);
  }
  //read
  getAllTask(): Observable<Task[]> {
    return this.http.get<Task[]>(this.serviceURL);
  }
  //update
  editTask(task: Task): Observable<Task> {
    return this.http.put<Task>(this.serviceURL + '/' + task.id, task);
  }
  //delete
  deleteTask(task: Task): Observable<Task> {
    return this.http.delete<Task>(this.serviceURL + '/' + task.id);
  }



}

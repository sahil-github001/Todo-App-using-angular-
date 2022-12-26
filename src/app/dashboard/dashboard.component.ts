import { Component } from '@angular/core';
import { Task } from '../modal/task';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  taskObj: Task = new Task();
  taskArr: Task[] = [];  //to store tasks

  addTaskValue: string = '';
  editTaskValue: string = '';

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.editTaskValue = '';
    this.addTaskValue = '';
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTask();
  }


  addTask() {
    this.taskObj.task_name = this.addTaskValue;   //this.taskObj.task_name
    this.crudService.addTask(this.taskObj).subscribe((res) => {
      this.ngOnInit();
    }, err => {
      alert('err');
    })
  }

  getAllTask() {
    this.crudService.getAllTask().subscribe((res) => {
      this.taskArr = res;
      this.addTaskValue = '';
    }, err => {
      alert('Unable to get list of tasks');
    })
  }

  editTask() {
    this.taskObj.task_name = this.editTaskValue;
    this.crudService.editTask(this.taskObj).subscribe((res) => {
      this.ngOnInit()
    }, err => {
      alert('Failed to update task');
    })
  }

  deleteTask(etask: Task) {
    this.crudService.deleteTask(etask).subscribe(res => {
      this.ngOnInit();
    }, err => {
      alert('Failed to delete task');
    })
  }

  call(etask: Task) {
    this.taskObj = etask;
    this.editTaskValue = etask.task_name;
  }
}

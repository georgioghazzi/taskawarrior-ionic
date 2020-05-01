import { Component, OnInit } from '@angular/core';
import { DatabaseService,Task } from 'src/app/services/database/database.service';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {
  

  constructor(private db:DatabaseService , private api : ApiService) { }
  // tasks : [] = [];
  tasks : Task[] = [];

  ngOnInit() {
    // this.db.getDatabaseStatus().subscribe(rdy=>{
    //   if(rdy){
    //     this.db.getTasks().subscribe(Tasks=>{
    //         this.tasks = Tasks
    //     })
    //   }
    // })
  }
  Sync(){
      this.api.getTasks().subscribe(data=>{
          for( var keys in data)
          this.tasks.push({
            ID:data[keys].uuid,
            description : data[keys].description,
            status : data[keys].status,
            date : data[keys].entry
          })
      });
      console.log(this.tasks)
  }
}

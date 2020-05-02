import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { DatabaseService,Task } from 'src/app/services/database/database.service';
import { LoadingController } from '@ionic/angular';
import { LoaderService } from 'src/app/services/loader/loader.service';


@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})
export class TaskPage implements OnInit {

  isLoaded = false;
  isNew = false;
  date:String = new Date().toISOString();
  description:String = '';



  constructor(private route: ActivatedRoute,private api : ApiService , private loader: LoaderService ,private router: Router) {
    // let loading = this.loadingCtrl.create({
    //   content: 'Please wait...'
    // });
   }

   task : Task[] = []
  ngOnInit() {
    if(this.router.url === '/task') {this.isNew = true;this.isLoaded = true}
    if(!this.isNew){
    this.loader.presentLoader();
    this.route.paramMap.subscribe(params => {
      let taskID = params.get('id');
      

      this.api.getTask(taskID).subscribe(data=>{
        this.task = data;
        this.description = data.description;
        this.date = data.entry;
        this.isLoaded=true
        this.loader.dismissLoader();
      })

    })
  }
  }

  CreateNewTask(){
    this.api.createTask({"description":this.description}).subscribe(data=>{
      console.log(data);
    })
  }

  EditTask(uuid){
    
    this.api.editTask(uuid,{"description":this.description}).subscribe(data=>{
      console.log(data)
    });
  }
 
}



  
  



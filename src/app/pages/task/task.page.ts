import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private route: ActivatedRoute,private api : ApiService , private loader: LoaderService ) {
    // let loading = this.loadingCtrl.create({
    //   content: 'Please wait...'
    // });
   }
  task : Task = null

  ngOnInit() {
    this.loader.presentLoader();
    this.route.paramMap.subscribe(params => {
      let taskID = params.get('id');
      

      this.api.getTask(taskID).subscribe(data=>{
       this.task = data 
        this.isLoaded=true
        this.loader.dismissLoader();
       console.log(this.task)
      })

    })

    
  }

 
}



  
  



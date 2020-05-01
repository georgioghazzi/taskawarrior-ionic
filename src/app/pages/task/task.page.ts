import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { DatabaseService,Task } from 'src/app/services/database/database.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})
export class TaskPage implements OnInit {

  loader:HTMLIonLoadingElement;
  isLoaded = false;

  constructor(private route: ActivatedRoute,private api : ApiService , public loadingController: LoadingController) {
    // let loading = this.loadingCtrl.create({
    //   content: 'Please wait...'
    // });
   }
  task : Task = null

  ngOnInit() {
    this.presentLoader();
    this.route.paramMap.subscribe(params => {
      let taskID = params.get('id');
      

      this.api.getTask(taskID).subscribe(data=>{
       this.task = data 
        this.isLoaded=true
        this.dismissLoader();
       console.log(this.task)
      })

    })

    
  }

  async presentLoader(options: any = {}) {
    this.loader = await this.loadingController.create(options);
    await this.loader.present();
  }

  async dismissLoader() {
      await this.loader.dismiss()
      .then(()=>{
        this.loader = null;
      })
      .catch(e => console.log(e));
  }
}



  
  



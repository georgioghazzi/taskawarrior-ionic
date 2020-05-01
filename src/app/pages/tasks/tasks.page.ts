import { Component, OnInit } from '@angular/core';
import { DatabaseService,Task } from 'src/app/services/database/database.service';
import { ApiService } from 'src/app/services/api/api.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {

  loader:HTMLIonLoadingElement;


  constructor(private db:DatabaseService , private api : ApiService , public loadingController: LoadingController) { }
  
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
            id:data[keys].id,
            description : data[keys].description,
            status : data[keys].status,
            entry : data[keys].entry,
            uuid:data[keys].uuid
          })
      });
      console.log(this.tasks)
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

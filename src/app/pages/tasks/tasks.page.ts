import { Component, OnInit } from '@angular/core';
import { DatabaseService,Task } from 'src/app/services/database/database.service';
import { ApiService } from 'src/app/services/api/api.service';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {

  isLoading = false;

  constructor(private db:DatabaseService , private api : ApiService , public loadingController: LoadingController,private alertController : AlertController) { }
  
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


  async MarkTaskAsDone(uuid) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: '<strong>Are you sure you want to mark this task as done?</strong>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Okay',
          handler: () => {
            this.api.markTaskAsDone(uuid).subscribe(data=>console.log(data))
            //Should Sync Here.
          }
        }
      ]
    });

    await alert.present();
  }

  async DeleteTask(uuid) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: '<strong>Are you sure you want to mark this task as done?</strong>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Okay',
          handler: () => {
            this.api.deleteTask(uuid).subscribe(data=>console.log(data))
            //Should Sync Here.
          }
        }
      ]
    });

    await alert.present();
  }


}
import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database/database.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  APIKey:any;
  


  constructor(private db:DatabaseService) { }

  ngOnInit() {
    
    this.db.getAPIKey().subscribe(data=>{
        console.log(data)
        this.APIKey=data
    })
  }

  test(){
   this.db.saveApiKey(this.APIKey);
   this.db.loadAPIKey();
    }
}

import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite , SQLiteObject} from '@ionic-native/sqlite/ngx';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

export interface Task { 
  id : string,
  uuid : string,
  description : string,
  status : string,
  entry : Date
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private database : SQLiteObject;
  private dbReady : BehaviorSubject<boolean> = new BehaviorSubject(false);
  
  tasks = new BehaviorSubject([]);
  APIKey = new BehaviorSubject([]);

  constructor(private plt:Platform, private sqlitePorter : SQLitePorter , private sqlite : SQLite, private http:HttpClient) {
      this.plt.ready().then(()=>{
        
        this.sqlite.create({
          name : 'taskwarriorDB.db',
          location:'default'
        })
        .then((db:SQLiteObject) => {
          this.database = db;
          this.seedDatabase();
          
        })

      })
      

   }

   seedDatabase(){

     this.http.get('assets/data.sql',{responseType:'text'})
     .subscribe(sql=>{
       this.sqlitePorter.importSqlToDb(this.database,sql)
       .then(_=>{
         this.loadTasks();
         this.loadAPIKey();
         this.dbReady.next(true);
       })
       .catch(e=>console.log(e));
     })
   }


   getDatabaseStatus(){
     return this.dbReady.asObservable();
   }

   getTasks(){
     return this.tasks.asObservable();
   }

   loadTasks(){
     return this.database.executeSql('Select * from Tasks',[]).then(data=>{
       let tasks : Task[] = [];
      
       if(data.rows.length>0){
         for(let i=0;i<data.rows.length ; i++){
           tasks.push({
              id:data.rows.item(i).ID,
             description : data.rows.item(i).description,
             status : data.rows.item(i).status,
             entry : data.rows.item(i).date,
             uuid:data.rows.item(i).uuid
           })
         }
       }
       this.tasks.next(tasks);

     })
    
   }

   saveApiKey(key){
     return this.database.executeSql(`UPDATE APIKey set Key = ? where id = 1`,[key]).then(data=>{

     })
     .catch(err=>{console.log(err)})
   }

   loadAPIKey(){
     return this.database.executeSql('Select Key from APIKey where id=1',[]).then(data=>{
       console.log(data);
        this.APIKey.next(data.rows.item(0).Key)
     })
   }


   getAPIKey(){
    return this.APIKey.asObservable();
   }
}


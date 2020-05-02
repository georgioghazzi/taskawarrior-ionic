import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from '../database/database.service'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //TO BE DELETED LATER
  APIUrl = `https://inthe.am/api/v2/`
  APIKey = '2d538ef085644d5717e06b58ffe6610dc3c67589'
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': `token ${this.APIKey}`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT'
    })
  };


  constructor(private http: HttpClient) { 
    
  }



   getTasks(){
    return this.http.get<Task[]>(this.APIUrl+'tasks/',this.httpOptions);
  }


  getTask(id){
    return this.http.get<Task>(this.APIUrl+'tasks/'+id+'/',this.httpOptions);
  }
  
  markTaskAsDone(id){
    return this.http.delete(this.APIUrl+'tasks/'+id+'/',this.httpOptions);
  }
  

  deleteTask(id){
    return this.http.post(this.APIUrl+'tasks/'+id+'/delete/',[] ,this.httpOptions);
  }
}

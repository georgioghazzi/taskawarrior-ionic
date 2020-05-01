import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from '../database/database.service'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //TO BE DELETED LATER
  proxyURL='https://cors-anywhere.herokuapp.com/'
  APIUrl = `${this.proxyURL}https://inthe.am/api/v2/`
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
  
  
}

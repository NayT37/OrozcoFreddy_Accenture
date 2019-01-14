import { Injectable } from '@angular/core';
import { Job } from './job.model';
import { Client } from './client.model';
//Import the HttpClient for CRUD
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  formClientData: Client;
  clientFromDB: Client;
  formJobData: Job;
  loginData: number;
  clientsArray: Client[];
  clientJob: Job;
  readonly URL: string;

  constructor(private httpClient: HttpClient, public router: Router) {
    this.URL = "http://localhost:50763/api";
    this.clientFromDB = new Client();
  }

  PostClient(data: Client) {
    //it returns an observer
    return this.httpClient.post(this.URL + '/Clientes', data);
  }

  PostJob(data: Job) {
    //it returns an observer
    return this.httpClient.post(this.URL + '/Jobs', data);
  }

  GetClients() {
    this.httpClient.get(this.URL + '/Clientes').toPromise()
      .then(function (res) {
        console.log(res);
        return res => res.json() as Client[];
      }, function (err) {
        alert("Server is angry :(");
      });
  }

  GetOneClient(valueID: number) {
    this.httpClient.get<Client>(this.URL + '/Clientes/' + valueID).subscribe(response => {
      console.log("Working in get " + this.clientFromDB);
      this.clientFromDB = response;
      this.router.navigate(['profile']);
    });
  }

  GetClientJob() {
    this.httpClient.get(this.URL + '/Jobs').
      toPromise().then(
        res => this.clientsArray = res as Client[]
      );
  }
}

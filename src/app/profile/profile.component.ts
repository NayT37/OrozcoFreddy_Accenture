import { Component, OnInit } from '@angular/core';
import { HttpService } from '../shared/http.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  _username: string;
  _hasJobInfo: boolean;

  constructor(private service: HttpService) {

  }

  ngOnInit() {
    this._username = this.service.clientFromDB.Name
    //ClientID (primmaryKey) is obtained as undefined
    console.log(this.service.clientFromDB.ClientID);
    //So the post method is not going to work, forgive me ):
    this.CheckForJobInfo();
  }

  RequestCredit() {
    //Check if user has JobInfo
    if (this._hasJobInfo) {
      //If true, validate credit
    } else {
      //Init job regiser info
    }
  }

  CheckForJobInfo() {
    //If has job info go true
    //Else, go false
    this._hasJobInfo = false;
  }

  GetCreditValue(value) {
    this._hasJobInfo = value;
  }

}

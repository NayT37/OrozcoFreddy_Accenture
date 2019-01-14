import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../shared/http.service';

/* Import lib MomentJS to compare dates */
import * as moment from 'moment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  private _actualDay;
  private _isAdult: boolean;
  private _idIsNumber: boolean;

  constructor(private service: HttpService, public router: Router) {
  }

  ngOnInit() {
    this._actualDay = moment();
    this._isAdult = false;
    this._idIsNumber = false;
    this.ResetForm();
  }

  ResetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formClientData = {
      ClientID: null,
      Name: null,
      LastName: null,
      BornDate: null,
      NumberID: null,
      PersonType: null
    }
  }

  ValidateDate(date1: Date) {
    if (moment(date1).diff(moment(this._actualDay), 'years') <= -18) {
      this._isAdult = true;
    } else {
      this._isAdult = false;
    }
  }

  ValidateIDNumber(value) {
    if (isNaN(value)) {
      this._idIsNumber = false;
    } else {
      this._idIsNumber = true;
    }
  }

  SendRegisterInfo(form: NgForm) {
    this.InsertRecord(form);
  }

  InsertRecord(form: NgForm) {
    console.log(form.value);
    //Suscribe to the returned observer, when post successfull, reset form
    this.service.PostClient(form.value).subscribe(
      //If everything goes well
      right => {
        this.service.clientFromDB = form.value;
        this.ResetForm(form);
        this.router.navigate(['profile']);
      },
      bad => {
        alert("Oops, algo ha salido mal, por favor intente nuevamente");
      }
    );
  }
}

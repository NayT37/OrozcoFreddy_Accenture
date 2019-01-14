import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpService } from '../shared/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  _isValid: boolean;

  constructor(private service: HttpService, public router: Router) {
  }

  ngOnInit() {
    this._isValid = false;
  }

  DBValidationCorrect(form: NgForm) {
    this.service.GetOneClient(1);
  }

  ValidateIDNumber(value) {
    if (isNaN(value) || value == "") {
      this._isValid = false;
    } else {
      this._isValid = true;
    }
  }

  ResetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.loginData = null
  }
}

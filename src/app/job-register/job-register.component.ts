import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../shared/http.service';
import { NgForm } from '@angular/forms';

/* Import lib MomentJS to compare dates */
import * as moment from 'moment';
import { Job } from '../shared/job.model';

@Component({
  selector: 'app-job-register',
  templateUrl: './job-register.component.html',
  styleUrls: ['./job-register.component.scss']
})
export class JobRegisterComponent implements OnInit {

  isValidNIT: boolean;
  isValidDate: boolean;
  isValidSalary: boolean;
  private _actualDay;
  private _actualSalary: number;
  private _differenceInDays: number;
  private _minSalaryToCredit: number;
  private _minDaysToCredit: number;
  private _limitSalaryArray: number[];
  private _creditValue: number;

  //To emit the event when credit is created so change the view in Profile component.
  @Output() creditSuccesfull: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private service: HttpService) { }
  ngOnInit() {
    this.isValidNIT = false;
    this.isValidDate = false;
    this.isValidSalary = false;
    this._actualDay = moment();
    this._minSalaryToCredit = 800000;
    this._limitSalaryArray = [
      1000000,
      4000000
    ];
    this._minDaysToCredit = 182;
    this._differenceInDays = 0;
    this._creditValue = 0;
    this.ResetForm();
  }

  ValidateNIT(value) {
    if (isNaN(value) || value == "")
      this.isValidNIT = false;
    else
      this.isValidNIT = true;
  }

  ValidateAdmissionDate(date1: Date) {
    this._differenceInDays = moment(date1).diff(moment(this._actualDay), 'days');
    if (this._differenceInDays == 0)
      this.isValidDate = false;
    else
      this.isValidDate = true;
  }

  ValidateSalary(value) {
    if (isNaN(value) || value == "" || value > 100000000 || value < 0 || value == 0)
      this.isValidSalary = false;
    else
      this.isValidSalary = true;
    this._actualSalary = value;
  }

  RequestCredit() {
    //hasJobInfo is now true
    let response = "";
    if (this._differenceInDays < -182) {
      if (this._actualSalary < this._limitSalaryArray[0]) {
        this._creditValue = 5000000;
        response = "aprobado por un valor de 5'000.000.";
        this.creditSuccesfull.emit(true);
      } else if (this._actualSalary >= this._limitSalaryArray[0]
        && this._actualSalary < this._limitSalaryArray[1]) {
        this._creditValue = 20000000;
        response = "aprobado por un valor de 20'000.000.";
        this.creditSuccesfull.emit(true);
      } else if (this._actualSalary >= this._limitSalaryArray[1]
      ) {
        this._creditValue = 20000000;
        response = "aprobado por un valor de 50'000.000.";
        this.creditSuccesfull.emit(true);
      }
    } else {
      response = "rechazado.";
    }
    alert("Su crédito fue " + response);
  }

  SendRegisterInfo(form: NgForm) {
    this.service.formJobData.ClientID = this.service.clientFromDB.ClientID;
    console.log(this.service.clientFromDB.ClientID);
    this.service.formJobData.Cliente = this.service.clientFromDB;
    this.RequestCredit();
    this.InsertRecord(this.service.formJobData);
  }

  InsertRecord(data: Job) {
    console.log(data);
    //Suscribe to the returned observer, when post successfull, reset form
    this.service.PostJob(data).subscribe(
      //If everything goes well
      right => {
        this.ResetForm();
      },
      bad => {
        alert("Oops, algo ha salido mal, por favor intente nuevamente");
      }
    );
  }

  ResetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formJobData = {
      JobID: null,
      CompanyName: null,
      Salary: null,
      AdmissionDate: null,
      CompanyNIT: null,
      ClientID: null,
      Cliente: null
    }
  }
}

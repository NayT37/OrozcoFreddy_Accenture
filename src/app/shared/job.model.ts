import { Client } from './client.model';

export class Job {
    JobID: number;
    CompanyName: string;
    Salary: string;
    AdmissionDate: Date;
    CompanyNIT: string;
    ClientID: number;

    Cliente: Client;
}

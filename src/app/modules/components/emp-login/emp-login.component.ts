import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { DataSharingService } from 'src/app/shared/services/data-sharing/data-sharing.service';

@Component({
  selector: 'app-emp-login',
  templateUrl: './emp-login.component.html',
  styleUrls: ['./emp-login.component.scss'],
})
export class EmpLoginComponent implements OnInit {
  empData: any;

  passwordVisible: boolean = false;
  EmpData: any;
  DataShare: any;

  constructor(
    private _apiservice: ApiService,
    private _formBuilder: FormBuilder,
    private router: Router,
    private _datashare: DataSharingService
  ) {}

  ngOnInit(): void {
    // this.getEmpDEtails();
  }

  form1 = this._formBuilder.group({
    name: ['', Validators.required],
    password: ['', Validators.required],
  });

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
    const passwordInput = document.getElementById(
      'password'
    ) as HTMLInputElement;
    if (this.passwordVisible) {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
  }

  getEmpDetails() {
    const username_data = this.form1.value.name;
    const password = this.form1.value.password;

    this._apiservice.EmpDetails().subscribe((res) => {

      this.EmpData = res.data[0];

      console.log(this.EmpData , 'data got');
      

      for (let i = 0; i < res.data.length; i++) {
        const elementUsername = res.data[i].emp_name;
        const elementEmployeeNumber = res.data[i].emp_no.toString();
        const elementPassword = res.data[i].password;


        // Check if either the username or the employee number matches
        if (
          (elementUsername === username_data ||
            elementEmployeeNumber === username_data) &&
          elementPassword === password
        ) {
          // Successful login
          this.router.navigate(['/visit-report']);
          console.log('Login successful');

          this.DataShare =  this._datashare.Empdata(this.EmpData);

          console.log( this.DataShare , 'data share success');

          return; // Exit the loop if login is successful
        }
      }
      // If loop completes without finding a match, login failed
      console.log(
        'Login failed. Incorrect username/employee number or password.'
      );
    });



    
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private _datashare: DataSharingService,
    private _snackBar: MatSnackBar,
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
    let loginSuccessful = false; // Flag to track successful login
  
    this._apiservice.EmpDetails().subscribe((res) => {
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
          // Set the flag to indicate successful login
          loginSuccessful = true;
          // Share employee data
          this.DataShare =  this._datashare.Empdata(res.data[i]);
          break; // Exit the loop if login is successful
        }
      }
  
      if (loginSuccessful) {
        // Successful login
        this.router.navigate(['/visit-report']);
        this._snackBar.open('Login successful!', 'Close', {
          duration: 3000,
        });
        console.log('Login successful');
      } else {
        // If loop completes without finding a match, login failed
        this._snackBar.open('Login failed. Incorrect username/employee number or password.', 'Close', {
          duration: 3000,
        });
        console.log('Login failed. Incorrect username/employee number or password.');
      }
    });
  }
  
}

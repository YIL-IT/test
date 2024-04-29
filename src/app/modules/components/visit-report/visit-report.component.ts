import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { DataSharingService } from 'src/app/shared/services/data-sharing/data-sharing.service';
import { HeaderTitleService } from 'src/app/shared/services/header-title/header-title.service';

@Component({
  selector: 'app-visit-report',
  templateUrl: './visit-report.component.html',
  styleUrls: ['./visit-report.component.scss'],
})
export class VisitReportComponent implements OnInit {
  qrValue: any;
  emp_no: any;
  emp_name: any;
  report: any;
  qr_Value: any;
  // showScanner: boolean = true; 
  // scannedQRs: any[] = []; 
  // scanCount: number = 0; 

  scannedQRs: Set<any> = new Set(); 
  showScanner: boolean = true; 
  errorMessage: string = ''; 
  canScan: boolean = true;
  receivedData: any;
  empDetails: any;

  constructor(
    private snackBar: MatSnackBar,
    private apiservice: ApiService,
    private _datashare: DataSharingService,
    public _dialog: MatDialog,
    private _headerTitle: HeaderTitleService,
    private http: HttpClient,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {


    this._datashare.Emp_Details_data.subscribe((data) => {
      this.empDetails = data;

      console.log(this.empDetails , 'sdfghjuklrtyu');
      
  
    });

  }




  hideScanner(): void {
    this.showScanner = false;
  }

  showscanner(): void {
    this.showScanner = true;
    this.errorMessage = ''; // Reset error message when showing scanner again
  }

  onQRCodeScanned(event: any): void {
    if (!this.canScan) return; // Stop scanning if canScan is false

    const scannedData = event;
    console.log('Scanned QR code data:', scannedData);

    if (scannedData) {
      if (!this.scannedQRs.has(scannedData)) {
        this.scannedQRs.add(scannedData); // Add the scanned data to the set
        this.openSnackBar('QR code scanned successfully!');
        this.hideScanner();
      } else {
        this.errorMessage = 'QR code already scanned';
        this.canScan = false; // Stop scanning if the same QR code is scanned again
      }
    } else {
      this.openSnackBar('QR code scanning unsuccessful');
    }
  }

  updateScanner(): void {
    this.showScanner = true;
    this.errorMessage = ''; 
    this.canScan = true; // Allow scanning again when the scanner is shown
  }

  


  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Duration in milliseconds
    });
  }

  form1 = this._formBuilder.group({
    name: ['', Validators.required],
    emp_no: ['', Validators.required],
    report: ['', Validators.required],
  });

  // postmethod() {
  //   // Get current date and time
  //   const currentDate = new Date();

  //   // Format the date and time as "YYYY-MM-DD HH:MM:SS"
  //   const formattedDate = `${currentDate.getFullYear()}-${(
  //     currentDate.getMonth() + 1
  //   ).toString().padStart(2, '0')}-${currentDate
  //     .getDate()
  //     .toString()
  //     .padStart(2, '0')} ${currentDate
  //     .getHours()
  //     .toString()
  //     .padStart(2, '0')}:${currentDate
  //     .getMinutes()
  //     .toString()
  //     .padStart(2, '0')}:${currentDate
  //     .getSeconds()
  //     .toString()
  //     .padStart(2, '0')}`.replace(/\.(\d{6})\b/, ''); // This removes the milliseconds
    

  //   // Assign the formatted date and time to a variable
  //   const dateTime = formattedDate;

  //   this.emp_no = this.form1.value.emp_no;
  //   this.emp_name = this.form1.value.name;
  //   this.report = this.form1.value.report;
  //   this.qr_Value = this.qrValue;

  //   // Construct the request body including the current date and time
  //   let body: any = {
  //     emp_no: this.emp_no,
  //     emp_name: this.emp_name,
  //     issue_report: this.report,
  //     qr_code: this.qr_Value,
  //     date_time: dateTime, // Include the formatted date and time
  //   };

  //   console.log(body, 'body');

  //   this.apiservice.inserEmpDetails(body).subscribe((res) => {
  //     console.log(res);
  //     if (res.statusCode === 200) {
  //       // location.reload();
  //       this.snackBar.open('Report sent Successfully', 'Close', {
  //         duration: 3000,
  //       });
  //     } else {
  //       this.snackBar.open('Report sending Unsuccessful', 'Close', {
  //         duration: 3000,
  //       });
  //     }
  //   });
  // }

  postmethod() {
    if (this.showScanner) {
      this.errorMessage = 'Please update before submitting';
      return;
    }
  
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${currentDate
      .getHours()
      .toString()
      .padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate
      .getSeconds()
      .toString()
      .padStart(2, '0')}`.replace(/\.(\d{6})\b/, '');
  
    const dateTime = formattedDate;
  
    this.emp_no = this.form1.value.emp_no;
    this.emp_name = this.form1.value.name;
    this.report = this.form1.value.report;
  
    // Assuming this.qrValue is the data of the scanned QR code
    const qrValue = this.qrValue;
  
    const body: any = {
      emp_no: this.emp_no,
      emp_name: this.emp_name,
      issue_report: this.report,
      qr_code: qrValue,
      date_time: dateTime,
    };
  
    console.log(body, 'body');
  
    this.apiservice.inserEmpDetails(body).subscribe(
      (res) => {
        console.log(res);
        if (res.statusCode === 200) {
          this.snackBar.open('Report sent Successfully', 'Close', {
            duration: 3000,
          });
        } else {
          this.snackBar.open('Report sending Unsuccessful', 'Close', {
            duration: 3000,
          });
        }
      },
      (error) => {
        // Handle error
        if (error.status === 409) {
          // If there's a conflict (duplicate), display a message to the user
          this.snackBar.open('QR code already scanned', 'Close', {
            duration: 3000,
          });
        } else {
          // If there's another error, display a generic error message
          this.snackBar.open('An error occurred', 'Close', {
            duration: 3000,
          });
        }
      }
    );
  }
  

}

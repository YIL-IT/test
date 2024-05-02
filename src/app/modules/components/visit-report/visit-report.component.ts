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
  qrCodes: any[] = []; // Array to store scanned QR codes
  showScanner: boolean = true;
  updateBtn: boolean = false;

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
    // Component initialization logic
  }

  // Other methods...

  onQRCodeScanned(event: any): void {
    this.qrValue = event;
    console.log('Scanned QR code data:', this.qrValue);

    if (this.qrValue) {
      // Show a snackbar
      this.openSnackBar('QR code scanned successfully!');

      // Check for duplicate QR codes
      if (this.isDuplicateQRCode(this.qrValue)) {
        // If the QR code is a duplicate, show an error message
        this.openSnackBar('QR code Already Scanned');
        return; // Stop further execution
      }

      // Generate a unique key for the scanned QR code
      const key = 'scan_' + (this.qrCodes.length + 1);

      // Add scanned QR code to array with the unique key
      this.qrCodes.push({ [key]: this.qrValue });
      
      console.log(this.qrCodes , 'qrCode datas');

      this.showScanner = false;
      this.updateBtn = true;
    } else {
      this.openSnackBar('QR code scanning Unsuccessful');
    }
}

isDuplicateQRCode(newQRCode: any): boolean {

    for (let i = 0; i < this.qrCodes.length; i++) {
        const element = this.qrCodes[i];

        for (const key in element) {
            if (element.hasOwnProperty(key)) {
                if (element[key] === newQRCode) {

                    return true;
                }
            }
        }
    }
    // If the new QR code is not found in the array, return false
    return false;
}

  updateQrcode(){
    this.showScanner = true;
    this.updateBtn = false;
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

//   postmethod() {
//     // Get current date and time
//     // const currentDate = new Date();

//     // // Format the date and time as "YYYY-MM-DD HH:MM:SS"
//     // const formattedDate = `${currentDate.getFullYear()}-${(
//     //   currentDate.getMonth() + 1
//     // )
//     //   .toString()
//     //   .padStart(2, '0')}-${currentDate
//     //   .getDate()
//     //   .toString()
//     //   .padStart(2, '0')} ${currentDate
//     //   .getHours()
//     //   .toString()
//     //   .padStart(2, '0')}:${currentDate
//     //   .getMinutes()
//     //   .toString()
//     //   .padStart(2, '0')}:${currentDate
//     //   .getSeconds()
//     //   .toString()
//     //   .padStart(2, '0')}`.replace(/\.(\d{6})\b/, ''); // This removes the milliseconds

//     // // Assign the formatted date and time to a variable
//     // const dateTime = formattedDate;

//     // this.emp_no = this.form1.value.emp_no;
//     // this.emp_name = this.form1.value.name;
//     // this.report = this.form1.value.report;

//     // Construct the request body including the current date and time
//     let body: any = {
//       // emp_no: this.emp_no,
//       // emp_name: this.emp_name,
//       // issue_report: this.report,
//       qr_codes: this.qrCodes, // Send all scanned QR codes
//       // date_time: dateTime, // Include the formatted date and time
//     };

//     console.log(body, 'body');

//     this.apiservice.inserEmpDetails(body).subscribe((res) => {
//       console.log(res);
//       if (res.statusCode === 200) {
//         // Clear the array and local storage after successful submission
//         this.qrCodes = [];
//         localStorage.removeItem('scannedQRCodes');

//         this.snackBar.open('Report sent Successfully', 'Close', {
//           duration: 3000,
//         });
//       } else {
//         this.snackBar.open('Report sending Unsuccessful', 'Close', {
//           duration: 3000,
//         });
//       }
//     });
// }

postmethod() {
  // Construct the request body with qr_code keys and URLs
  const body = {
    qr_codes: this.qrCodes
  };

  console.log(body, 'body');

  // Assuming 'inserEmpDetails' is your API endpoint for submitting QR code data
  this.apiservice.inserEmpDetails(body).subscribe((res) => {
    console.log(res);
    if (res.statusCode === 200) {
      // Clear the array and local storage after successful submission
      this.qrCodes = [];
      localStorage.removeItem('scannedQRCodes');

      this.snackBar.open('Report sent Successfully', 'Close', {
        duration: 3000,
      });
    } else {
      this.snackBar.open('Report sending Unsuccessful', 'Close', {
        duration: 3000,
      });
    }
  });
}


}

import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
// import { environment } from 'src/environments/environment.prod';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {


  private httpClient:HttpClient

  constructor(private http: HttpClient, private handler: HttpBackend) {
    this.httpClient = new HttpClient(handler);
  }

  EmpDetails(): Observable<any> {
    return this.http.get<any>(`${environment.EmpDetails}`,);
  }
  
  inserEmpDetails(details:any): Observable<any> {
    return this.http.post<any>(`${environment.inserEmpDetails}`,details);
  }


  // InsertUserDetails(details: any) {
  //   return this.http.post<any>(
  //     ${environment.InsertUserDetails},
  //     details
  //   );
  // }






}

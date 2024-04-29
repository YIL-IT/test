import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisitReportComponent } from './modules/components/visit-report/visit-report.component';
import { EmpLoginComponent } from './modules/components/emp-login/emp-login.component';

const routes: Routes = [
  {path:'',redirectTo:'emp-login',pathMatch:'full'},
{path:'emp-login' , component:EmpLoginComponent},
{path:'visit-report' , component:VisitReportComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

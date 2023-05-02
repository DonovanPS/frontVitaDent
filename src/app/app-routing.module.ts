import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistorySearchComponent } from './components/history-search/history-search.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { NewHistoryComponent } from './components/new-history/new-history.component';
import { RecordsComponent } from './components/records/records.component';
import { PatientComponent } from './components/patient/patient.component';
import { NewHistoryOrtodonciaComponent } from './components/new-history-ortodoncia/new-history-ortodoncia.component';

const routes: Routes = [
  { path: 'history-search', component: HistorySearchComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'new-history', component: NewHistoryComponent, canActivate: [AuthGuard] },
  { path: 'records', component: RecordsComponent, canActivate: [AuthGuard]},
  { path: 'patient', component: PatientComponent, canActivate: [AuthGuard]},
  { path: 'new-history-ortodoncia', component: NewHistoryOrtodonciaComponent, canActivate: [AuthGuard] },
  

  { path: 'login', component: LoginComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'login' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

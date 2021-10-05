import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdDrawComponent } from './components/id-draw/id-draw.component';
import { DetailsFormComponent } from './components/details-form/details-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
  { path: '', component: DetailsFormComponent, pathMatch: 'full' },
  { path: 'signup', component: LoginFormComponent, pathMatch: 'full' },
  { path: 'login', component: SignupFormComponent },
  { path: 'draw', component: IdDrawComponent },
  { path: 'admin', component: AdminComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

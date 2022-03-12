import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { ContactComponent } from './contact/contact.component';
import { AppComponent } from './app.component';


const routes: Routes = [
  {path: 'Profile-component', component: ProfileComponent, canActivate: [AuthGuard] },
  {path: 'Home-component', component: HomeComponent},
  {path: 'Login-component', component: LoginComponent},
  {path: 'Contact-component', component: ContactComponent},
  {path: 'App-component', component: AppComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

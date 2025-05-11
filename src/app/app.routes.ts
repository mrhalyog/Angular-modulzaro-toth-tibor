import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { CensoredComponent } from './pages/censored/censored.component';
import { WordcloudComponent } from './pages/wordcloud/wordcloud.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'censored', component: CensoredComponent },
  { path: 'wordcloud', component: WordcloudComponent },
];

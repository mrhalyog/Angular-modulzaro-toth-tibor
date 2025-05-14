import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { CensoredComponent } from './pages/censored/censored.component';
import { WordcloudComponent } from './pages/wordcloud/wordcloud.component';

export const routes: Routes = [
  { path: '', redirectTo:"login" , pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'censored', component: CensoredComponent },
  { path: 'wordcloud', component: WordcloudComponent },
];   

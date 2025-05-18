import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule]
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  fullName: string = '';
  confirmPassword: string = '';
  registrationMode: boolean = false;
  errorMessage: string = '';
  avatarUrl= 'https://xsgames.co/randomusers/avatar.php?g=male';
  showErrorAlert: boolean = false; // Új változó az alert dobozhoz

  constructor(private router: Router, private http: HttpClient) {}

  toggleRegistration(): void {
    this.registrationMode = !this.registrationMode;
  }

  loginUser(): void {
    const usersDB = JSON.parse(localStorage.getItem('usersDB') || '[]');

    const user = usersDB.find((user: any) => user.username === this.username && user.password === this.password);

    if (!user) {
      this.errorMessage = "Sikertelen belépés!";
      this.showErrorAlert = true; // Alert aktiválása
      setTimeout(() => this.showErrorAlert = false, 3000); // Alert eltüntetése 3 másodperc után
      return;
    }

    console.log("Felhasználó belépett:", user);
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    this.router.navigate(['home']);
  }

  registerUser(): void {
    if (!this.username || !this.password || !this.confirmPassword || !this.fullName) {
      alert("Minden mezőt ki kell tölteni!");
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert("A két jelszó nem egyezik meg!");
      return;
    }

    const newUser = {
        username: this.username,
        password: this.password,
        fullName: this.fullName,
        avatarUrl: this.avatarUrl
      };

      const usersDB = JSON.parse(localStorage.getItem('usersDB') || '[]');
      usersDB.push(newUser);
      localStorage.setItem('usersDB', JSON.stringify(usersDB));

      alert("Sikeres regisztráció!");
      this.registrationMode = false;
  }

  
}



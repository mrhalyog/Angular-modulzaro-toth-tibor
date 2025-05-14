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
  avatarUrl: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  /**
   * Regisztrációs mód váltása
   */
  toggleRegistration(): void {
    this.registrationMode = !this.registrationMode;
  }

  /**
   * Felhasználó bejelentkezése
   */
  loginUser(): void {
    const usersDB = JSON.parse(localStorage.getItem('usersDB') || '[]');

    const user = usersDB.find((user: any) => user.username === this.username && user.password === this.password);

    if (!user) {
      this.errorMessage = "Sikertelen belépés!";
      return;
    }

    console.log("Felhasználó belépett:", user);
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    this.router.navigate(['dashboard']);
  }

  /**
   * Felhasználó regisztrációja
   */
  registerUser(): void {
    if (!this.username || !this.password || !this.confirmPassword || !this.fullName) {
      alert("Minden mezőt ki kell tölteni!");
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert("A két jelszó nem egyezik meg!");
      return;
    }

    this.generateAvatar(() => {
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
    });
  }

  /**
   * Avatar generálása
   */
  generateAvatar(callback: () => void): void {
    this.http.get('https://xsgames.co/randomusers/avatar.php?g=male', { responseType: 'text' })
      .subscribe({
        next: (data: string) => {
          console.log("Generált avatar URL:", data);
          this.avatarUrl = data.includes("http") ? data : 'assets/default-avatar.png';
          callback();
        },
        error: () => {
          console.error("Avatar generálás sikertelen!");
          this.avatarUrl = 'assets/default-avatar.png';
          callback();
        }
      });
  }
}


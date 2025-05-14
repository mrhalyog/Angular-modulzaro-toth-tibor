import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  loggedInUser: any = {};

  constructor(private router: Router) {}

  /**
   * Komponens inicializálása
   */
  ngOnInit(): void {
    this.loadLoggedInUser();
  }

  /**
   * Bejelentkezett felhasználó adatainak betöltése
   */
  private loadLoggedInUser(): void {
    const user = localStorage.getItem('loggedInUser');
    if (user) {
      this.loggedInUser = JSON.parse(user);
    } else {
      this.redirectToLogin();
    }
  }

  /**
   * Navigáció cenzúrázási felületre
   */
  navigateToCensorship(): void {
    this.router.navigate(['/censorship']);
  }

  /**
   * Kilépési művelet
   */
  logout(): void {
    console.log("Felhasználó kijelentkezett...");
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }

  /**
   * Átirányítás a bejelentkezési oldalra, ha nincs bejelentkezett felhasználó
   */
  private redirectToLogin(): void {
    this.router.navigate(['/login']);
  }
}


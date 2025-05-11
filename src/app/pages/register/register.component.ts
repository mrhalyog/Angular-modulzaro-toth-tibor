import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';

  onSubmit() {
    console.log('Regisztrációs adatok:', {
      username: this.username,
      email: this.email,
      password: this.password
    });
  }
}


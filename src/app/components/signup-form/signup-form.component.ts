import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent implements OnInit {
  error = '';
  loading = false;

  constructor(private auth: AuthenticationService) {}

  ngOnInit(): void {}

  login(form: NgForm): void {
    const details = form.value;
    this.loading = true;
    this.auth
      .signIn(details.email, details.password)
      .then(() => {
        this.loading = false;
        window.location.href = '';
      })
      .catch((err) => {
        this.loading = false;
        this.error = err;
      });
  }
}

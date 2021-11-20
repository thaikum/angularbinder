import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../../authentication.service';
import { LookupsService } from '../../lookups.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  errors!: string;
  loading = false;
  constructor(
    private authentication: AuthenticationService,
    private lookupService: LookupsService
  ) {}

  ngOnInit(): void {}

  createUser(signUp: NgForm): void {
    this.loading = true;
    this.errors = '';
    const values = signUp.value;
    if (values.password === values.password2) {
      this.authentication
        .signUp({
          email: values.email,
          password: values.password,
        })
        .then((r) => {
          this.lookupService.createLookup(values.email, r).then(() => {
            this.loading = false;
            window.location.href = '';
          });
        })
        .catch((err) => {
          this.loading = false;
          this.errors = err;
        });
    } else {
      this.errors = 'passwords do not match';
      this.loading = false;
    }
  }
}

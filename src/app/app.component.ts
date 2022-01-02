import { Component, OnInit } from '@angular/core';
import { LookupsService } from './lookups.service';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private lookupService: LookupsService,
    private auth: AuthenticationService
  ) {}
  title = 'databinder';
  isLoggedIn = false;
  numberOfLookups = 0;
  showProfile = false;
  showPassword = false;
  currentUser = '';
  isAdmin = false;

  countLookups(): void {
    this.lookupService.getLookups().subscribe((lookup: any) => {
      this.numberOfLookups = lookup.lookups;
      this.currentUser = lookup.email;
      this.isAdmin = lookup.adminType;
    });
  }

  ngOnInit(): void {
    const currentUser = localStorage.getItem('dataBinderUser');
    if (currentUser) {
      this.countLookups();
      this.isLoggedIn = true;
    }
  }

  logout(): void {
    this.auth.signOut().then(() => {
      window.location.href = '/login';
    });
  }
}

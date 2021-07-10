import { Component } from '@angular/core';
import { LookupsService } from './lookups.service';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private lookupService: LookupsService,
    private auth: AuthenticationService
  ) {}
  title = 'databinder';
  isLoggedIn = false;
  numberOfLookups = 0;

  countLookups(): void {
    this.lookupService.getLookups().subscribe((lookup: any) => {
      this.numberOfLookups = lookup.lookups;
    });
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void {
    const currentUser = localStorage.getItem('dataBinderUser');
    if (currentUser) {
      this.countLookups();
      this.isLoggedIn = true;
    }
  }

  logout(): void {
    this.auth.signOut().then(() => {
      window.location.href = '/signup';
    });
  }
}

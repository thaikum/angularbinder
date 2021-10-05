import { Component, OnInit } from '@angular/core';
import { LookupsService } from '../../lookups.service';
import { window } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  usersAndLookups: any;
  noOfLookups!: number;
  currentEmail!: string;
  currentLookup!: number;
  currentUser!: string;
  showChanger = false;
  constructor(private lookupService: LookupsService, private router: Router) {}

  ngOnInit(): void {
    const currentUser = localStorage.getItem('dataBinderUser');
    if (currentUser !== 'D3YWgjH9DndDEtvBYryE1wlvrHh2') {
      this.router.navigate(['']);
    }
    this.getLookups();
  }

  getLookups(): void {
    this.usersAndLookups = this.lookupService
      .getAllUsersLookups()
      .subscribe((lookups) => {
        this.usersAndLookups = lookups;
      });
  }

  setCurrentEmail(email: string, lookups: number, user: string): void {
    this.currentEmail = email;
    this.currentLookup = lookups;
    this.currentUser = user;
  }

  updateLookups(lookup: any): void {
    console.log(this.currentUser);
    // tslint:disable-next-line:radix
    lookup = parseInt(lookup);
    this.lookupService.setLookups(lookup, this.currentUser).then(() => {
      this.currentEmail = '';
    });
  }
}

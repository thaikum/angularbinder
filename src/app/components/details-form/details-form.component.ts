import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LookupsService } from '../../lookups.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details-form',
  templateUrl: './details-form.component.html',
  styleUrls: ['./details-form.component.scss'],
})
export class DetailsFormComponent implements OnInit {
  numberOfLookups = 0;
  isAdmin = false;
  constructor(private lookupService: LookupsService, private router: Router) {
    const isLoggedIn = localStorage.getItem('dataBinderUser');
    if (!isLoggedIn) {
      window.location.href = 'signup';
    }
  }

  ngOnInit(): void {
    const currentUser = localStorage.getItem('dataBinderUser');

    this.isAdmin = currentUser === 'D3YWgjH9DndDEtvBYryE1wlvrHh2';

    this.countLookups();
  }
  countLookups(): void {
    this.lookupService.getLookups().subscribe((lookup: any) => {
      this.numberOfLookups = lookup.lookups;
    });
  }

  submitDetails(form: NgForm): void {
    this.router.navigateByUrl('draw', {
      state: form.value,
    });
  }
}

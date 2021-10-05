import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LookupsService } from '../../lookups.service';
import { Location } from '@angular/common';
import { LOCATIONS } from '../../location';

@Component({
  selector: 'app-id-draw',
  templateUrl: './id-draw.component.html',
  styleUrls: ['./id-draw.component.scss'],
})
export class IdDrawComponent implements OnInit {
  details: any;
  secondLine!: string;
  thirdLine!: string;
  numberOfLookups = 0;
  idFront = false;

  name = '';
  idNumber = '';
  gender = '';
  placeOfIssue;
  placeOfBirth;
  serialNumber = '';
  dob = '';
  dateOfIssue = '';

  currentLocation: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private lookupService: LookupsService,
    private location: Location
  ) {
    // @ts-ignore
    this.details = this.router.getCurrentNavigation().extras.state;
    this.currentLocation =
      LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
    this.placeOfIssue = this.currentLocation.location;
    this.placeOfBirth = this.currentLocation.division;
  }

  detailsFiller(): void {
    const firstName = this.details.firstName;
    let k = 8 - this.details.idNumber.length;
    let zeros = '';
    while (k--) {
      zeros += '0';
    }
    let secondName = this.details.secondName;
    const lastName = this.details.lastName;
    const dateOfBirth = this.details.date;
    const idNumber = zeros + this.details.idNumber;
    const gender = this.details.gender;

    this.name = firstName + ' ' + secondName + ' ' + lastName;
    this.idNumber = this.details.idNumber;
    this.gender = gender === 'M' ? 'Male' : 'Female';
    this.serialNumber = '24' + Math.floor(Math.random() * 90000000 + 10000000);
    const dob = dateOfBirth.split('-');
    this.dob = dob[2] + '.' + dob[1] + '.' + dob[0];

    this.dateOfIssue =
      // tslint:disable-next-line:radix
      dob[2] + '.' + dob[1] + '.' + (parseInt(dob[0]) + 19).valueOf();

    this.secondLine =
      dob[0].valueOf().substr(2, 2) + dob[1] + dob[2] + '0' + gender;
    if (this.idNumber.length === 8 && this.idNumber[0] !== '0') {
      const id = dob[0].valueOf() === '2000' ? '7' : dob[0].valueOf()[0];
      this.secondLine += '1702150<B0' + idNumber + 'M<<' + id;
    } else {
      this.secondLine += '1702150<B00' + idNumber + 'M<<';
    }

    secondName = secondName === '' ? ' ' : secondName;

    const lastLine = firstName + '<' + secondName + '<' + lastName;
    let lessThan = 30 - lastLine.length;
    let filler = '';
    while (lessThan--) {
      filler += '<';
    }
    this.thirdLine = lastLine + filler;
  }

  countLookups(): void {
    this.lookupService.getLookups().subscribe((lookup: any) => {
      this.numberOfLookups = lookup.lookups;
      if (lookup.lookups <= 0) {
        window.location.href = '';
      }
    });
  }

  ngOnInit(): void {
    const isLoggedIn = localStorage.getItem('dataBinderUser');
    if (!isLoggedIn) {
      window.location.href = 'signup';
    } else {
      console.log(this.location.getState());
      this.countLookups();
      this.detailsFiller();
      this.lookupService.decrementLookup();
    }
  }

  goBack(): void {
    this.location.back();
  }
}

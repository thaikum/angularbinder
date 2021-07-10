import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LookupsService } from '../../lookups.service';
import { Location } from '@angular/common';

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
  placeOfIssue = 'Nairobi';
  placeOfBirth = 'Kisii';
  serialNumber = '';
  dob = '';
  dateOfIssue = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private lookupService: LookupsService,
    private location: Location
  ) {
    // @ts-ignore
    this.details = this.router.getCurrentNavigation().extras.state;
  }

  detailsFiller(): void {
    const firstName = this.details.firstName;
    let secondName = this.details.secondName;
    const lastName = this.details.lastName;
    const dateOfBirth = this.details.date;
    const idNumber =
      this.details.idNumber.length >= 8
        ? this.details.idNumber
        : '0' + this.details.idNumber;
    const gender = this.details.gender;

    this.name = firstName + ' ' + secondName + ' ' + lastName;
    this.idNumber = idNumber;
    this.gender = gender === 'M' ? 'Male' : 'Female';
    this.serialNumber = '24' + Math.floor(Math.random() * 90000000 + 10000000);
    const dob = dateOfBirth.split('-');
    this.dob = dob[2] + '.' + dob[1] + '.' + dob[0];

    this.dateOfIssue =
      // tslint:disable-next-line:radix
      dob[2] + '.' + dob[1] + '.' + (parseInt(dob[0]) + 19).valueOf();

    let spacer: string;
    if (idNumber.length === 8) {
      spacer = '<';
    } else if (idNumber.length === 7) {
      spacer = '<<';
    } else {
      spacer = '<<';
    }

    this.secondLine =
      dob[0].valueOf().substr(2, 2) +
      dob[1] +
      dob[2] +
      '0' +
      gender +
      '1702150<B0' +
      idNumber +
      'M<<' +
      dob[0].valueOf()[0];
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

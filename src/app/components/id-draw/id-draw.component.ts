import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LookupsService } from '../../lookups.service';
import { Location } from '@angular/common';
import { LOCATIONS } from '../../location';

@Component({
  selector: 'app-id-draw',
  templateUrl: './id-draw.component.html',
  styleUrls: ['./id-draw.component.scss'],
})
export class IdDrawComponent implements OnInit, AfterViewInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private lookupService: LookupsService,
    private location: Location
  ) {
    // @ts-ignore
    this.details = this.router.getCurrentNavigation().extras.state;

    // if (!this.details) {
    //   router.navigate(['/']).then();
    // }

    this.currentLocation =
      LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
    this.placeOfIssue = this.currentLocation.location;
    this.placeOfBirth = this.currentLocation.division;
  }
  details: any;
  secondLine!: string;
  thirdLine!: string;
  numberOfLookups = 0;
  idFront = true;

  @ViewChild('canvas') idCanvas!: ElementRef;
  @ViewChild('image') myImage!: ElementRef;

  name = '';
  idNumber = '';
  gender = '';
  placeOfIssue;
  placeOfBirth;
  serialNumber = '';
  dob = '';
  dateOfIssue = '';
  stripBinder = false;
  useStrip = false;

  currentLocation: any;
  currentImage = '';

  @ViewChild('trial') div!: ElementRef;

  detailsFiller(): void {
    // const firstName = this.details.firstName;
    // let k = 8 - this.details.idNumber.length;
    // let zeros = '';
    // while (k--) {
    //   zeros += '0';
    // }
    //
    // let secondName = this.details.secondName;
    // const lastName = this.details.lastName;
    //
    // const dateOfBirth = this.details.date;
    // const idNumber = zeros + this.details.idNumber;
    // const gender = this.details.gender;

    const firstName = 'fredrick';
    const idNumber = 35604512;
    const secondName = 'maina';
    const lastName = 'thaiku';
    // const gender = 'Male';
    this.idNumber = '35604512';
    this.gender = 'M';
    const dateOfBirth = '1998-10-20';
    this.currentImage = 'male';

    this.name = firstName + ' ' + secondName + ' ' + lastName;
    // this.idNumber = this.details.idNumber;
    // this.gender = gender === 'M' ? 'Male' : 'Female';
    this.serialNumber = '24' + Math.floor(Math.random() * 90000000 + 10000000);
    const dob = dateOfBirth.split('-');
    this.dob = dob[2] + '.' + dob[1] + '.' + dob[0];
    const rand = Math.floor(Math.random() * 9) + 1;
    // this.currentImage = gender === 'M' ? 'male' : 'female';
    this.currentImage = 'assets/' + this.currentImage + rand + '.png';

    console.log(this.currentImage);

    this.dateOfIssue =
      // tslint:disable-next-line:radix
      dob[2] + '.' + dob[1] + '.' + (parseInt(dob[0]) + 19).valueOf();

    this.secondLine =
      dob[0].valueOf().substr(2, 2) + dob[1] + dob[2] + '0' + this.gender;
    if (this.idNumber.length === 8 && this.idNumber[0] !== '0') {
      const id = dob[0].valueOf() === '2000' ? '7' : dob[0].valueOf()[0];
      this.secondLine += '1702150<B0' + idNumber + 'M<<' + id;
    } else {
      this.secondLine += '1702150<B00' + idNumber + 'M<<';
    }

    // secondName = secondName === '' ? ' ' : secondName;

    const lastLine = firstName + '<' + secondName + '<' + lastName;
    let lessThan = 30 - lastLine.length;
    let filler = '';
    while (lessThan--) {
      filler += '<';
    }
    this.thirdLine = lastLine + filler;
  }

  // ensure that there are lookups before drawing an ID
  countLookups(): void {
    this.lookupService.getLookups().subscribe((lookup: any) => {
      this.numberOfLookups = lookup.lookups;
      this.useStrip = lookup.useStrip;
      if (lookup.lookups <= 0) {
        window.location.href = '';
      }
    });
  }

  ngOnInit(): void {
    this.detailsFiller();
    // const isLoggedIn = localStorage.getItem('dataBinderUser');
    // if (!isLoggedIn) {
    //   window.location.href = 'signup';
    // } else {
    //   // this.countLookups();
    //   // this.detailsFiller();
    //   // this.lookupService.decrementLookup();
    //   this.drawId();
    // }
  }

  ngAfterViewInit(): void {
    // this.drawFrontId();
    this.drawBackId();
  }

  // Go back to details form
  goBack(): void {
    this.location.back();
  }
  drawFrontId(): void {
    const canvas = this.idCanvas.nativeElement as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    const image = new Image();
    image.src = '../../../assets/idFront.png';
    image.height = 250;
    // this.div.nativeElement.appendChild(image);

    if (!!ctx) {
      // clear the canvas first
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ctx.clearRect(0, 0, canvas.width, canvas.height);
      image.onload = () => {
        ctx.drawImage(image, 0, 0, 394.633, 250);
        ctx.font = 'ultra-condensed 800 13px data-font';
        // ctx.fillStyle = 'rgba(0,0,0,0.9)';

        // serial Number
        ctx.fillText(this.serialNumber, 92, 55);

        // ID number
        ctx.fillText(this.idNumber, 270, 57);

        // name
        ctx.fillText(this.name.toUpperCase(), 35, 80);

        // D.O.B
        ctx.fillText(this.dob, 157, 101);

        // sex
        ctx.fillText(this.gender, 157, 123);

        // distict
        ctx.fillText(this.placeOfBirth.toUpperCase(), 157, 145);

        // place of issue
        ctx.fillText(this.placeOfIssue.toUpperCase(), 157, 166);

        // date of issue
        ctx.fillText(this.dateOfIssue, 157, 188);

        // signature
        ctx.font = 'bold 15px signature';
        ctx.fillText(this.name.split(' ')[0], 170, 226);

        // person image
        const frontImage = new Image();
        frontImage.src = this.currentImage;

        frontImage.onload = () => {
          ctx.drawImage(frontImage, 40, 100, 110, 125);
        };
      };
      console.log('i drew');
    }
  }

  drawBackId(): void {
    const canvas = this.idCanvas.nativeElement as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    const image = new Image();
    image.src = '../../../assets/idBack.png';
    image.height = 250;
    // this.div.nativeElement.appendChild(image);

    if (!!ctx) {
      // clear the canvas first
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // draw id shell
      image.onload = () => {
        ctx.drawImage(image, 0, 0, 394.633, 250);
        ctx.font = 'ultra-condensed 800 13px data-font';

        // district
        ctx.fillText(this.currentLocation.district.toUpperCase(), 45, 56);

        // division
        ctx.fillText(this.currentLocation.division.toUpperCase(), 45, 78);

        // location
        ctx.fillText(this.currentLocation.location.toUpperCase(), 45, 99);

        // sub-location
        ctx.fillText(this.currentLocation.subLocation.toUpperCase(), 45, 121);

        // t-filler
        ctx.fillText(this.detailsFiller());
      };
    }
  }
}

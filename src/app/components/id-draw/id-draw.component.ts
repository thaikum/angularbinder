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

    if (!this.details) {
      router.navigate(['/']).then();
    }

    this.currentLocation =
      LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
    this.placeOfIssue = this.currentLocation.location;
    this.placeOfBirth = this.currentLocation.division;
  }
  details: any;
  secondLine!: string;
  thirdLine!: string;
  numberOfLookups = 0;
  idFront = false;

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
  // stripBinder = false;
  useStrip = false;
  tFiller!: number;

  currentLocation: any;
  currentImage = '';

  @ViewChild('trial') div!: ElementRef;

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
    this.tFiller = Math.floor(Math.random() * 900) + 100;

    this.name = firstName + ' ' + secondName + ' ' + lastName;
    this.idNumber = this.details.idNumber;
    this.gender = gender === 'M' ? 'Male' : 'Female';
    this.serialNumber = '24' + Math.floor(Math.random() * 9000000 + 1000000);
    const dob = dateOfBirth.split('-');
    this.dob = dob[2] + '.' + dob[1] + '.' + dob[0];
    const rand = Math.floor(Math.random() * 9) + 1;
    this.currentImage = gender === 'M' ? 'male' : 'female';
    this.currentImage = 'assets/' + this.currentImage + rand + '.png';

    console.log(this.currentImage);

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
    const isLoggedIn = localStorage.getItem('dataBinderUser');
    if (!isLoggedIn) {
      window.location.href = 'signup';
    } else {
      this.countLookups();
      this.detailsFiller();
      this.lookupService.decrementLookup();
    }
  }

  ngAfterViewInit(): void {
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
      ctx.rotate(0);

      // clear the canvas first
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ctx.clearRect(0, 0, canvas.width, canvas.height);
      image.onload = () => {
        ctx.drawImage(image, 0, 0, 370, 245);
        ctx.font = 'ultra-condensed 800 14px data-font';

        // serial Number
        ctx.fillText(this.serialNumber, 90, 55);

        // ID number
        ctx.fillText(this.details.idNumber, 263, 57);

        // name
        ctx.fillText(this.name.toUpperCase(), 35, 80);

        // D.O.B
        ctx.fillText(this.dob, 150, 100);

        // sex
        ctx.fillText(this.gender.toUpperCase(), 150, 122);

        // distict
        ctx.fillText(this.placeOfBirth.toUpperCase(), 150, 144);

        // place of issue
        ctx.fillText(this.placeOfIssue.toUpperCase(), 150, 165);

        // date of issue
        ctx.fillText(this.dateOfIssue, 150, 187);

        // signature
        ctx.font = 'bold 20px signature';
        ctx.fillText(this.name.split(' ')[0], 170, 224);

        // person image
        const frontImage = new Image();
        frontImage.src = this.currentImage;

        frontImage.onload = () => {
          ctx.drawImage(frontImage, 37, 93, 110, 130);
        };
        ctx.save();
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
      ctx.rotate(0);

      // clear the canvas first
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // draw id shell
      image.onload = () => {
        ctx.drawImage(image, 0, 0, 370, 245);
        ctx.font = 'ultra-condensed 900 13px data-font';
        ctx.save();

        // district
        ctx.fillText(this.currentLocation.district.toUpperCase(), 43, 55);

        // division
        ctx.fillText(this.currentLocation.division.toUpperCase(), 43, 77);

        // location
        ctx.fillText(this.currentLocation.location.toUpperCase(), 43, 98);

        // sub-location
        ctx.fillText(this.currentLocation.subLocation.toUpperCase(), 43, 120);

        // back image
        const backImage = new Image();
        backImage.src = this.currentImage;

        backImage.onload = () => {
          ctx.drawImage(backImage, 161, 52, 55, 65);
        };

        // t-filler
        ctx.font = 'ultra-condensed 800 15px data-font';
        ctx.fillText(String(this.tFiller), 327, 144);

        // binder
        // rotate for the text to align with the image
        ctx.rotate(-Math.PI / 200);
        ctx.font = 'ultra-expanded 800 15px binder-font';

        // first line
        const num = Math.floor(Math.random() * 10);
        const firstLine = 'IDKYA' + this.serialNumber + num + '<<3981<<<<<3982';
        ctx.fillText(firstLine, 18, 184);

        // second line
        ctx.fillText(this.secondLine.toUpperCase(), 18, 205);

        // third line
        ctx.fillText(this.thirdLine.toUpperCase(), 18, 226);

        ctx.restore();
      };
    }
  }

  flipId(): void {
    this.idFront = !this.idFront;

    if (this.idFront) {
      this.drawFrontId();
    } else {
      this.drawBackId();
    }
  }
}

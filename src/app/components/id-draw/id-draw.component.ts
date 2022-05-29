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

    // this.details = {
    //   secondName: 'maina',
    //   lastName: 'thaiku',
    //   date: '1998-20-10',
    //   idNumber: '35604512',
    //   gender: 'M',
    //   firstName: 'fredrick',
    // };

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
    // this.drawFrontId();
  }

  // Go back to details form
  goBack(): void {
    this.location.back();
  }

  // draw the front side of the ID using HTML canvas
  drawFrontId(): void {
    const canvas = this.idCanvas.nativeElement as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    // multiply used
    const frontOffset = 138;

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
        ctx.drawImage(image, 0, 0, 350, 214.633);
        ctx.font = 'ultra-condensed 800 14px data-font';

        // serial Number
        ctx.fillText(this.serialNumber, 80, 42);

        // ID number
        ctx.fillText(this.details.idNumber, 246, 45);

        // name
        ctx.fillText(this.name.toUpperCase(), 26, 65);

        // D.O.B
        ctx.fillText(this.dob, frontOffset, 85);

        // sex
        ctx.fillText(this.gender.toUpperCase(), frontOffset, 105);

        // district
        ctx.fillText(this.placeOfBirth.toUpperCase(), frontOffset, 125);

        // place of issue
        ctx.fillText(this.placeOfIssue.toUpperCase(), frontOffset, 145);

        // date of issue
        ctx.fillText(this.dateOfIssue, frontOffset, 165);

        // signature
        ctx.font = 'bold 20px signature';
        ctx.fillText(this.name.split(' ')[0], 165, 200);

        // person image
        const frontImage = new Image();
        frontImage.src = this.currentImage;

        frontImage.onload = () => {
          ctx.drawImage(frontImage, 25, 80, 110, 120);
        };
        ctx.save();
      };
      console.log('i drew');
    }
  }

  // draw the back side of the ID
  drawBackId(): void {
    const canvas = this.idCanvas.nativeElement as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    // common distance
    const leftDataOffset = 34;

    const image = new Image();
    image.src = '../../../assets/idBack.png';
    image.height = 214.633;
    // this.div.nativeElement.appendChild(image);

    if (!!ctx) {
      // ctx.fillStyle = 'rgba(0,0,0,0.9)';

      // clear the canvas first
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // draw id shell
      image.onload = () => {
        ctx.drawImage(image, 0, 0, 350, 214.633);
        ctx.font = 'ultra-condensed 13px data-font';
        ctx.fillStyle = 'rgba(0,0,0,0.9)';
        ctx.save();

        // district
        ctx.fillText(
          this.currentLocation.district.toUpperCase(),
          leftDataOffset,
          45
        );

        // division
        ctx.fillText(
          this.currentLocation.division.toUpperCase(),
          leftDataOffset,
          64
        );

        // location
        ctx.fillText(
          this.currentLocation.location.toUpperCase(),
          leftDataOffset,
          83
        );

        // sub-location
        ctx.fillText(
          this.currentLocation.subLocation.toUpperCase(),
          leftDataOffset,
          102
        );

        // back image
        const backImage = new Image();
        backImage.src = this.currentImage;

        backImage.onload = () => {
          ctx.drawImage(backImage, 141, 52, 40, 50);
        };

        // t-filler
        ctx.font = '100 15px data-font';
        ctx.fillStyle = 'rgba(0,0,0,0.25)';
        ctx.fillText(String(this.tFiller), 268, 132);

        // binder
        const binderOffset = 12;
        ctx.font = 'bold 15px binder-font';
        ctx.fillStyle = 'rgba(0,0,0,0.7)';

        // first line
        const num = Math.floor(Math.random() * 10);
        const firstLine = 'IDKYA' + this.serialNumber + num + '<<3981<<<<<3982';
        ctx.fillText(firstLine, binderOffset, 160);

        // second line
        ctx.fillText(this.secondLine.toUpperCase(), binderOffset, 180);

        // third line
        ctx.fillText(this.thirdLine.toUpperCase(), binderOffset, 200);

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

  downloadImage(): void {
    const canvas = this.idCanvas.nativeElement as HTMLCanvasElement;
    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    const side = this.idFront ? '-front' : '-back';
    a.download = this.details.firstName + side;
    a.click();
  }
}

import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[appDrawSignature]',
})
export class DrawSignatureDirective implements AfterViewInit {
  @Input() signatureText!: string;

  constructor(private elm: ElementRef) {}

  ngAfterViewInit(): void {
    console.log(this.signatureText.split(' ')[0]);
    const ctx = this.elm.nativeElement.getContext('2d');
    ctx.font = '25px Monsieur La Doulaise';
    ctx.fillText(this.signatureText.split(' ')[0].toLowerCase(), 0, 30);
  }
}

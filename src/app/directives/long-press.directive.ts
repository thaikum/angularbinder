import {
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
import { fromEvent } from 'rxjs';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[OnLongPress]',
})
export class LongPressDirective implements OnInit {
  pressing!: boolean;
  longPressing!: boolean;
  timeout: any;
  interval!: number;

  @Output() longPressed: EventEmitter<void> = new EventEmitter<void>();
  constructor(private ref: ElementRef) {}

  @HostBinding('class.press')
  get press(): boolean {
    return this.pressing;
  }

  @HostBinding('class.longpress')
  get longPress(): boolean {
    return this.longPressing;
  }

  @HostListener('touchstart')
  @HostListener('mousedown')
  onMouseDown(): void {
    this.pressing = true;
    this.longPressing = false;
    this.timeout = setTimeout(() => {
      this.longPressing = true;
      this.longPressed.emit();
      this.interval = setInterval(() => {
        this.longPressed.emit();
      }, 50);
    }, 500);
  }

  @HostListener('touchend')
  @HostListener('mouseup')
  @HostListener('mouseleave')
  endPress(): void {
    clearTimeout(this.timeout);
    clearInterval(this.interval);
    this.longPressing = false;
    this.pressing = false;
  }

  ngOnInit(): void {}
}

import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
  Optional,
  Output,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { filter } from 'rxjs/operators';

@Directive({
  selector: '[appModal]',
})
export class ModalDirective implements OnInit, OnDestroy {
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  subscription!: Subscription;

  constructor(
    @Optional() @Inject(DOCUMENT) private document: any,
    private element: ElementRef
  ) {}

  ngOnInit(): void {
    setTimeout(
      () =>
        (this.subscription = fromEvent<MouseEvent>(this.document, 'click')
          .pipe(
            filter((event) => {
              const clickElement = event.target as HTMLElement;
              return !this.isOrContainsClickTarget(
                this.element.nativeElement,
                clickElement
              );
            })
          )
          .subscribe(() => {
            this.closeModal.emit();
          })),
      0
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  isOrContainsClickTarget(
    element: HTMLElement,
    clickedTarget: HTMLElement
  ): boolean {
    return element === clickedTarget || element.contains(clickedTarget);
  }
}

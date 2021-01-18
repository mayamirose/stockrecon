import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';

@Directive({
  selector: '[appOutsideClick]'
})
export class OutsideClickDirective {
  @Input() id: string;
  @Output() outsideClick: EventEmitter<boolean> = new EventEmitter();

  @HostListener('document:click', ['$event']) onClick($event): void {
    /* Check if click is outside, if so then emit */
    if (!document.getElementById(this.id).contains($event.target)) {
      this.outsideClick.emit(true);
    }
  }
}

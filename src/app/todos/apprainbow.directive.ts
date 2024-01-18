import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[apprainbow]'
})
export class ApprainbowDirective {
  @HostBinding('style.backgroundColor') backgroundColor = 'transparent';
  @HostBinding('style.color') textColor = 'black';

  @HostListener('mouseenter') onMouseEnter() {
    this.backgroundColor = 'green';
    this.textColor = 'white';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.backgroundColor = 'transparent';
    this.textColor = 'black';
  }
}

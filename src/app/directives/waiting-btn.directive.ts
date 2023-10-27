import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appWaitingBtn]'
})
export class WaitingBtnDirective {

  default: Record<string, string | null> = {};
  stopped = false;
  #interval = 0;

  @HostListener('click', ['$event']) stop() {
    if (this.stopped) return;
    this.stopped = true;

    this.trigger.style.pointerEvents = 'none';
    this.#interval = window.setTimeout(this.continue, 5e3);
  }

  trigger: HTMLElement;

  constructor(elementRef: ElementRef<HTMLElement>) {
    this.trigger = elementRef.nativeElement;
  }

  ngAfterViewInit(): void {
    this.default['pointerEvents'] = this.trigger.style.pointerEvents;
  }

  continue = () => {
    this.trigger.style.pointerEvents = this.default['pointerEvents'] as string;
    this.stopped = false;
  }

  ngOnDestroy(): void {
    clearTimeout(this.#interval);
  }

}

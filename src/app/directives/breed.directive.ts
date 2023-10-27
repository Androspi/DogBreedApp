import { Directive, ElementRef, Input, SimpleChanges } from '@angular/core';

import { StringUtils } from '../utils/string.utils';

@Directive({
  selector: '[appBreed]'
})
export class BreedDirective {

  @Input({ required: true }) appBreed!: string;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private stringUtils: StringUtils,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if ('appBreed' in changes) {
      const { breed, subBreed } = this.getBreed(this.appBreed);
      this.elementRef.nativeElement.innerHTML = '';
      if (subBreed) this.elementRef.nativeElement.innerHTML += `<h6 class="mat-headline-6 m-0 sub-breed-container">${subBreed}</h6>`;
      this.elementRef.nativeElement.innerHTML += `<h4 class="mat-headline-4 m-0 breed-container">${breed}</h4>`;
    }
  }

  /**
   * Get breed from image source
   * @param src Image source
   * @returns breed text
   */
  getBreed(src: string): { breed: string; subBreed: string | undefined } {
    const [, , , , id] = src.split('/');
    const [breed, subBreed] = id.split('-').map(item => this.stringUtils.capitalizeFirst(item ?? ''));
    return { breed, subBreed };
  }

}

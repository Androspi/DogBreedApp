import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { SharedModule } from '../../shared.module';

import { BreedsService } from 'src/app/services/rest/breeds.service';

import { BreedParams } from 'src/app/interfaces/breed.interface';

@Component({
  selector: 'app-dogs',
  templateUrl: './dogs.component.html',
  styleUrls: ['./dogs.component.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class DogsComponent implements AfterViewInit, OnDestroy {

  listeners: { parent: HTMLElement | Window, id: string, callback: () => any }[] = [];
  queryParamSubscription$: undefined | Subscription;
  imageSubscription$: undefined | Subscription;
  imagePromise$: undefined | Promise<string[]>;

  /** Dogs */
  images: string[] = [];
  loadedImages: string[] = [];

  paginator = { limit: 18, page: 1 };

  gettingImages = false;
  isMobile = false;

  get breed() {
    return (this.route.queryParams as BehaviorSubject<Record<string, any>>).getValue()['find'];
  }

  constructor(
    private breeds: BreedsService,
    private route: ActivatedRoute,
  ) { }

  ngAfterViewInit(): void {
    setTimeout(() => { // ExpressionChangedAfterItHasBeenCheckedError
      this.queryParamSubscription$ = this.route.queryParams.subscribe(({ find = '' }) => {
        if (find != undefined) {
          this.#replace({ breed: find || undefined, limit: find ? undefined : this.paginator.limit });

          const searcher = document.querySelector<HTMLInputElement>('#input-searcher');
          if (searcher) searcher.value = find;
        }
      });


      const appHeight = () => this.isMobile = window.innerWidth < 600;

      appHeight();
      window.addEventListener('resize', appHeight);

      this.listeners.push({ parent: window, id: 'resize', callback: appHeight });
    }, 0);
  }

  #replace(params: BreedParams) {
    this.#getImages(params).then(images => {
      this.images = images;

      const { limit, page } = this.paginator;
      this.loadedImages = images.slice(0, limit * page);
    });
  }

  load() {
    if (this.gettingImages) return;

    this.gettingImages = true;
    this.paginator.page++;

    const { limit, page } = this.paginator;
    const breed = this.breed;

    if (!breed) {
      this.#getImages({ breed: undefined, limit: limit * 1.5 }).then(images => {
        this.images = [...new Set([...this.images, ...images])];
        this.loadedImages = this.images.slice(0, limit * page);
        this.gettingImages = false;
      });
      return;
    }

    if (this.loadedImages.length >= this.images.length) {
      this.gettingImages = false;
      return;
    }

    this.loadedImages = this.images.slice(0, limit * page);
    this.gettingImages = false;
  }

  #getImages(params: BreedParams) {
    this.imageSubscription$?.unsubscribe();

    return new Promise<string[]>(resolve =>
      this.imageSubscription$ = this.breeds.images(params).subscribe((images) => resolve(images)));
  }

  ngOnDestroy(): void {
    this.listeners.forEach(({ callback, id, parent }) => parent.removeEventListener(id, callback));
    this.queryParamSubscription$?.unsubscribe();
    this.imageSubscription$?.unsubscribe();
  }

}

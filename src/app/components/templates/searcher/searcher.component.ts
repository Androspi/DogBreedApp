import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss']
})
export class SearcherComponent implements OnDestroy {

  breedSubscription$: undefined | Subscription;

  #searchInterval = 0;

  constructor(
    private router: Router,
  ) { }

  search = (event: HTMLInputElement) => {
    clearInterval(this.#searchInterval);
    this.#searchInterval = window.setTimeout(() => {
      this.router.navigate([`/dogs`], { queryParams: { find: event.value || undefined } });
    }, 1e3);
  }

  ngOnDestroy(): void {
    this.breedSubscription$?.unsubscribe();
    clearInterval(this.#searchInterval);
  }

}

import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { BreedsService } from 'src/app/services/rest/breeds.service';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss']
})
export class SearcherComponent implements OnDestroy {

  breedSubscription$: undefined | Subscription;
  formSubscription$: undefined | Subscription;

  breeds: string[] = [];
  filteredBreeds: string[] = [];

  control = new FormControl('');

  constructor(
    private service: BreedsService,
    private router: Router,
  ) { }

  ngAfterViewInit(): void {
    this.breedSubscription$ = this.service.all().subscribe(response => {
      const breeds: string[] = Object.entries(response).map(
        ([breed, subBreeds]) => [breed, ...subBreeds.map(subBreed => `${breed}-${subBreed}`)]
      ).flat();

      this.breeds = breeds;
      this.filteredBreeds = breeds;
    });

    this.formSubscription$ = this.control.valueChanges.subscribe((value) => {
      this.filteredBreeds = this.filterBreeds(value || '');
      if (value && !this.breeds.includes(value)) return;
      this.search(value || undefined);
    });
  }

  /**
   * Updates query param with selected value
   * @param value selected value
   */
  search = (value: string | undefined) => {
    this.router.navigate([`/dogs`], { queryParams: { find: value } });
  }

  /**
   * filter the races that match
   * @param search text to compare
   */
  filterBreeds(search: string) {
    return this.breeds.filter(breed => breed.toLowerCase().includes(search.toLowerCase()));
  }

  ngOnDestroy(): void {
    this.breedSubscription$?.unsubscribe();
    this.formSubscription$?.unsubscribe();
  }

}

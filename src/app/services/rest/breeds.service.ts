import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

import { BreedParams } from 'src/app/interfaces/breed.interface';

@Injectable({
  providedIn: 'root'
})
export class BreedsService {

  constructor(
    private http: HttpClient
  ) { }

  images({ limit, find }: BreedParams) {
    let src = `${environment.api}`;

    if (find !== undefined) {
      const [breed, subBreed] = find.split('-');

      src += `breed/${breed}`;
      if (subBreed) src += `/${subBreed}`;
      src += `/images`;
      if (limit) src += `/random/${limit}`;
    } else {
      src += `breeds/image/random/${limit || 2}`;

    }

    return this.http.get<string[]>(src);
  }

  /** Search list of breed names */
  all() {
    return this.http.get<Record<string, string[]>>(`${environment.api}breeds/list/all`);
  }

}

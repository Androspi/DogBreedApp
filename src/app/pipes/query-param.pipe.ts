import { ActivatedRoute, Params } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

@Pipe({
  name: 'queryParam'
})
export class QueryParamPipe implements PipeTransform {

  constructor(
    private route: ActivatedRoute
  ) { }

  transform(value: string) {
    return (this.route.queryParams as BehaviorSubject<Params>).pipe(map(({ [value]: param }) => param));
  }

}

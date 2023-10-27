import { NgModule } from '@angular/core';

import { BreedDirective } from './breed.directive';

const directives: any[] = [
    BreedDirective
];

@NgModule({
    declarations: directives,
    exports: directives
})
export class DirectivesModule { }

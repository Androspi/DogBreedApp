import { NgModule } from '@angular/core';

import { WaitingBtnDirective } from './waiting-btn.directive';
import { ConfettiDirective } from './confetti.directive';
import { BreedDirective } from './breed.directive';

const directives: any[] = [
    WaitingBtnDirective,
    ConfettiDirective,
    BreedDirective,
];

@NgModule({
    declarations: directives,
    exports: directives
})
export class DirectivesModule { }

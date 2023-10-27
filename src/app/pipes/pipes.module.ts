import { NgModule } from '@angular/core';

import { QueryParamPipe } from './query-param.pipe';

const pipes: any[] = [
    QueryParamPipe
];

@NgModule({
    declarations: pipes,
    exports: pipes
})
export class PipesModule { }

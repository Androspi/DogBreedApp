import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { DirectivesModule } from '../directives/directives.module';
import { PipesModule } from '../pipes/pipes.module';
import { MaterialModule } from './material.module';

import { SearcherComponent } from './templates/searcher/searcher.component';
import { HeaderComponent } from './templates/header/header.component';
import { LogoComponent } from './templates/logo/logo.component';

const modules = [
    InfiniteScrollModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgOptimizedImage,
    DirectivesModule,
    MaterialModule,
    RouterModule,
    CommonModule,
    PipesModule,
    FormsModule,
];

const templates: any[] = [
    SearcherComponent,
    HeaderComponent,
    LogoComponent
];

@NgModule({
    exports: [modules, templates],
    declarations: [templates],
    imports: [modules],
})
export class SharedModule { }

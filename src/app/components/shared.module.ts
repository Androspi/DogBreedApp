import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { DirectivesModule } from '../directives/directives.module';
import { PipesModule } from '../pipes/pipes.module';
import { MaterialModule } from './material.module';

import { LogoComponent } from './templates/logo/logo.component';
import { HeaderComponent } from './templates/header/header.component';

const modules = [
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
    HeaderComponent,
    LogoComponent
];

@NgModule({
    exports: [modules, templates],
    declarations: [templates],
    imports: [modules],
})
export class SharedModule { }

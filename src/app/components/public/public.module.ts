import { NgModule } from '@angular/core';

import { PublicRoutingModule } from './public-routing.module';
import { SharedModule } from '../shared.module';

import { PublicComponent } from './public.component';

@NgModule({
  imports: [
    PublicRoutingModule,
    SharedModule,
  ],
  declarations: [
    PublicComponent
  ],
})
export class PublicModule { }

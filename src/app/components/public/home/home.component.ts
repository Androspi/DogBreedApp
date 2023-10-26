import { Component } from '@angular/core';

import { SharedModule } from '../../shared.module';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule]
})
export class HomeComponent {

}

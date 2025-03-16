import { Component } from '@angular/core';
import { HeaderComponent } from 'src/app/layouts/header/header.component';

@Component({
  selector: 'app-heritage',
  templateUrl: 'heritage.component.html',
  styleUrls: ['heritage.component.scss'],
  standalone: true,
  imports: [HeaderComponent]
})
export class HeritageComponent {

  constructor() {}

}
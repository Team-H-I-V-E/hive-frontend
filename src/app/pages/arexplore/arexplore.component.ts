import { Component } from '@angular/core';
import { HeaderComponent } from 'src/app/layouts/header/header.component';

@Component({
  selector: 'app-arexplore',
  templateUrl: 'arexplore.component.html',
  styleUrls: ['arexplore.component.scss'],
  standalone: true,
  imports: [HeaderComponent]
})
export class ARExploreComponent {

  constructor() {}

}

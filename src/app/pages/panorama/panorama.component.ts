import { Component } from '@angular/core';
import { HeaderComponent } from 'src/app/layouts/header/header.component';

@Component({
  selector: 'app-panorama',
  templateUrl: 'panorama.component.html',
  styleUrls: ['panorama.component.scss'],
  standalone: true,
  imports: [HeaderComponent]
})
export class PanoramaComponent {

  constructor() {}

}
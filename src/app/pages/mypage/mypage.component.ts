import { Component } from '@angular/core';
import { HeaderComponent } from 'src/app/layouts/header/header.component';

@Component({
  selector: 'app-mypage',
  templateUrl: 'mypage.component.html',
  styleUrls: ['mypage.component.scss'],
  standalone: true,
  imports: [HeaderComponent]
})
export class MyPageComponent {

  constructor() {}

}

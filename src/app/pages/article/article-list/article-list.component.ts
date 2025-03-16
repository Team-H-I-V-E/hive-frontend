import { Component } from '@angular/core';
import { HeaderComponent } from 'src/app/layouts/header/header.component';

@Component({
  selector: 'app-article',
  templateUrl: 'article-list.component.html',
  styleUrls: ['article-list.component.scss'],
  standalone: true,
  imports: [HeaderComponent]
})
export class ArticleComponent {

  constructor() {}

}
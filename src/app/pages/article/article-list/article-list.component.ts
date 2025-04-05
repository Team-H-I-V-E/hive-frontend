import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/article/article.model';
import { ArticleService } from 'src/app/services/article/aritlce.service';
import { environment } from 'src/environment/environment';


@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
  standalone: false,
})
export class ArticleListComponent implements OnInit {
  articles: Article[] = [];
  environment = environment;

  constructor(
    private articleService: ArticleService,
    private router: Router
  ) { }

  ngOnInit() {
    this.articleService.getArticles().subscribe((res) => {
      this.articles = res;
      console.log('불러온 게시글:', this.articles);
      const article = this.articles[0];
    });
  }

  goToDetail(articleId: number) {
    this.router.navigate(['/articles/detail', articleId]);
  }
}

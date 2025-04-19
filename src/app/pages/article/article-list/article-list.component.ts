import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/article/article.model';
import { ArticleService } from 'src/app/services/article/aritlce.service';
import { environment } from 'src/environment/environment';

interface ArticleWithUI extends Article {
  currentImageIndex: number;
  userProfileImage?: string;
  nickname?: string;
}

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
  standalone: false,
})
export class ArticleListComponent implements OnInit {
  articles: ArticleWithUI[] = [];
  environment = environment;

  constructor(
    private articleService: ArticleService,
    private router: Router
  ) {}

  ngOnInit() {
    this.articleService.getArticles().subscribe((res: Article[]) => {
      this.articles = res.map(article => ({
        ...article,
        currentImageIndex: 0,
      }));
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/article/article.model';
import { ArticleService } from 'src/app/services/article/aritlce.service';
import { environment } from 'src/environment/environment';

interface ArticleWithUI extends Article {
  currentImageIndex: number;
  user?: {
    nickname: string;
  };
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
  visibleArticles: ArticleWithUI[] = [];
  pageSize = 6;
  page = 0;

  constructor(
    private articleService: ArticleService,
    private router: Router
  ) { }

  ngOnInit() {
    this.articleService.getArticles().subscribe((res: Article[]) => {
      this.articles = res.map(article => ({
        ...article,
        currentImageIndex: 0,
      }));
      this.loadMoreArticles(); // 첫 페이지 불러오기
    });
  }

  goToDetail(articleId: number): void {
    this.router.navigate(['/article', articleId]);
  }

  prevImage(article: ArticleWithUI, event: Event): void {
    event.stopPropagation();
    const length = article.articleImages?.length || 0;
    article.currentImageIndex = (article.currentImageIndex - 1 + length) % length;
  }

  nextImage(article: ArticleWithUI, event: Event): void {
    event.stopPropagation();
    const length = article.articleImages?.length || 0;
    article.currentImageIndex = (article.currentImageIndex + 1) % length;
  }

  toggleLike(event: Event, article: ArticleWithUI): void {
    event.stopPropagation();
    // 여기에 API 호출 또는 상태 반영
  }

  toggleFavorite(event: Event, article: ArticleWithUI): void {
    event.stopPropagation();
    // 여기에 API 호출 또는 상태 반영
  }

  loadMoreArticles(): void {
    const start = this.page * this.pageSize;
    const end = start + this.pageSize;
    const nextChunk = this.articles.slice(start, end);
    this.visibleArticles = [...this.visibleArticles, ...nextChunk];
    this.page++;
  }
}
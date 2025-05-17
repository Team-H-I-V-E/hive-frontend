import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/article/article.model';
import { ArticleService } from 'src/app/services/article/aritlce.service';
import { environment } from 'src/environment/environment';

interface ArticleWithUI extends Article {
  currentImageIndex: number;
  userProfileImage?: string;
  nickname?: string;
  liked?: boolean;
  bookmarked?: boolean;
}

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
  standalone: false,
})
export class ArticleListComponent implements OnInit, AfterViewChecked {
  articles: ArticleWithUI[] = [];
  environment = environment;
  private isCarouselInitialized = false;

  constructor(
    private articleService: ArticleService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.articleService.getArticles().subscribe((res: Article[]) => {
      this.articles = res.map((article) => ({
        ...article,
        currentImageIndex: 0,
        liked: false,
        bookmarked: false,
      }));
    });
  }

  ngAfterViewChecked(): void {
    // 캐러셀 슬라이드 이벤트 연결 (한 번만)
    if (!this.isCarouselInitialized && this.articles.length > 0) {
      setTimeout(() => {
        this.articles.forEach((article) => {
          const carouselEl = document.querySelector(
            `#carousel-${article.articleId}`
          );
          if (carouselEl) {
            carouselEl.addEventListener('slid.bs.carousel', (event: any) => {
              article.currentImageIndex = event.to;
            });
          }
        });
        this.isCarouselInitialized = true;
      }, 0);
    }
  }

  goToDetail(articleId: number): void {
    this.router.navigate(['/article', articleId]);
  }

  onCarouselClick(event: Event): void {
    event.stopPropagation(); // 카드 클릭 방지
  }

  toggleLike(article: ArticleWithUI, event: Event): void {
    event.stopPropagation();
    article.liked = !article.liked;
  }

  toggleBookmark(article: ArticleWithUI, event: Event): void {
    event.stopPropagation();
    article.bookmarked = !article.bookmarked;
  }
}
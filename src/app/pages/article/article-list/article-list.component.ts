import { Component, OnInit } from '@angular/core';
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
export class ArticleListComponent implements OnInit {
  articles: ArticleWithUI[] = [];
  environment = environment;

  constructor(
    private articleService: ArticleService,
    private router: Router
  ) { }

  ngOnInit() {
    this.articleService.getArticles().subscribe((res: Article[]) => {
      this.articles = res.map((article) => ({
        ...article,
        currentImageIndex: 0,
        liked: false, // 초기값
        bookmarked: false, // 초기값
      }));
    });
  }

  goToDetail(articleId: number): void {
    this.router.navigate(['/article', articleId]);
  }

  onCarouselClick(event: Event): void {
    event.stopPropagation();
  }

  // 좋아요 토글
  toggleLike(article: ArticleWithUI, event: Event): void {
    event.stopPropagation(); // 디테일 이동 방지
    article.liked = !article.liked;
    // 서버 연동이 필요하면 여기서 호출
  }

  // 즐겨찾기 토글
  toggleBookmark(article: ArticleWithUI, event: Event): void {
    event.stopPropagation(); // 디테일 이동 방지
    article.bookmarked = !article.bookmarked;
    // 서버 연동이 필요하면 여기서 호출
  }
}
import { Component, HostListener, OnInit } from '@angular/core';
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
  page = 1;         // ✅ 현재 페이지
  limit = 30;       // ✅ 한 번에 가져올 개수
  isLoading = false; // ✅ 중복 로딩 방지
  isEnd = false;    // ✅ 마지막 페이지 감지

  constructor(
    private articleService: ArticleService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadArticles();
  }

  loadArticles() {
    if (this.isLoading || this.isEnd) {
      return;
    }
    this.isLoading = true;

    this.articleService.getArticles(this.page, this.limit).subscribe((res: Article[]) => {
      if (res.length === 0) {
        this.isEnd = true; // 데이터 없으면 끝!
      } else {
        const newArticles = res.map(article => ({
          ...article,
          currentImageIndex: 0,
        }));
        this.articles = [...this.articles, ...newArticles];
        this.page++; // 페이지 올리기
      }
      this.isLoading = false;
    });
  }

  // ✅ 스크롤 이벤트 감지
  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollPosition = window.innerHeight + window.scrollY;
    const documentHeight = document.body.offsetHeight;

    if (scrollPosition >= documentHeight - 300) {
      // 화면 아래 300px 남았을 때 추가 로딩
      this.loadArticles();
    }
  }
}

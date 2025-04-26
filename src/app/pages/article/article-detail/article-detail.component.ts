import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'src/app/services/article/aritlce.service';
import { environment } from 'src/environment/environment';
import { Article } from 'src/app/models/article/article.model';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
  standalone: false,
})
export class ArticleDetailComponent implements OnInit {
  article!: Article & { currentImageIndex: number };
  environment = environment;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    const articleId = Number(this.route.snapshot.paramMap.get('id'));
    this.articleService.getArticleById(articleId).subscribe(article => {
      this.article = { ...article, currentImageIndex: 0 };
    });
  }

  prevImage(article: any, event: Event): void {
    event.stopPropagation();
    const total = article.articleImages.length;
    article.currentImageIndex = (article.currentImageIndex - 1 + total) % total;
  }

  nextImage(article: any, event: Event): void {
    event.stopPropagation();
    const total = article.articleImages.length;
    article.currentImageIndex = (article.currentImageIndex + 1) % total;
  }
}
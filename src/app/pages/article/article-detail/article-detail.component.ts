import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/models/article/article.model';
import { CommentModel } from 'src/app/models/comment/comment.model';
import { ArticleService } from 'src/app/services/article/aritlce.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CommentService } from 'src/app/services/comment/comment.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
  standalone: false,
})
export class ArticleDetailComponent implements OnInit {
  article!: Article;
  comments: CommentModel[] = [];
  commentInput = '';
  currentUserId: number | null = null;
  environment = environment;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private commentService: CommentService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    const articleId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadArticle(articleId);
    this.loadComments(articleId);
    this.currentUserId = this.authService.getUserIdFromToken(); // JWT에서 userId 추출
  }

  loadArticle(articleId: number) {
    this.articleService.getArticleById(articleId).subscribe(res => {
      this.article = res;
    });
  }

  loadComments(articleId: number) {
    this.commentService.getCommentsByArticleId(articleId).subscribe(res => {
      this.comments = res;
    });
  }

  postComment() {
    if (!this.commentInput.trim()) return;

    this.commentService.createComment({
      articleId: this.article.articleId,
      comments: this.commentInput
    }).subscribe(() => {
      this.commentInput = '';
      this.loadComments(this.article.articleId); // 댓글 새로고침
    });
  }

  isOwner(): boolean {
    return this.article?.user?.userId === this.currentUserId;
  }
}
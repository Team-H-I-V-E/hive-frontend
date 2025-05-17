import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommentModel } from 'src/app/models/comment/comment.model';
import { environment } from 'src/environment/environment';

@Injectable({
    providedIn: 'root',
})
export class CommentService {
    private readonly API_URL = `${environment.apiBaseUrl}/api/comments`;

    constructor(private http: HttpClient) { }

    /** 아티클별 댓글 조회 */
    getCommentsByArticleId(articleId: number): Observable<CommentModel[]> {
        return this.http.get<CommentModel[]>(`${this.API_URL}/article/${articleId}`);
    }

    /** 댓글 작성 */
    createComment(payload: { articleId: number; comments: string }): Observable<CommentModel> {
        return this.http.post<CommentModel>(`${this.API_URL}/`, payload, {
            withCredentials: true,
        });
    }

    /** 댓글 삭제 */
    deleteComment(commentId: number): Observable<void> {
        return this.http.delete<void>(`${this.API_URL}/${commentId}`, {
            withCredentials: true,
        });
    }
}
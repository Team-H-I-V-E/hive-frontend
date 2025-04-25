import { User } from '../user/user.model';

export interface CommentModel {
    commentsId: number;
    articleId: number;
    comments: string;
    articleCreatedAt: Date;
    user: User;
}
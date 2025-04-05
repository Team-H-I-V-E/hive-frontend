export interface Article {
    articleId: number;
    userID: number;
    articleTitle: string;
    articleContents: string;
    articleCreatedAt: Date;
    articleUpdatedAt?: Date;
    articleImages: string[];
  }  
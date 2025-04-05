export interface CreateArticleDto {
    userId: number;
    articleTitle: string;
    articleContents: string;
    articleImages?: string[];
  }  
import { ArticleImages } from "./articleImage.model";

export interface Article {
    "articleId": number;
    "userId": number;
    "articleTitle": string;
    "articleContents": string;
    "articleCreatedAt": Date;
    "articleUpdatedAt?": Date;
    "articleImages": ArticleImages[];
  }
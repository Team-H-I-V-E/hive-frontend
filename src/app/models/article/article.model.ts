import { User } from "../user/user.model";
import { ArticleImages } from "./articleImage.model";

export interface Article {
    "articleId": number;
    "user": User;
    "articleTitle": string;
    "articleContents": string;
    "articleCreatedAt": Date;
    "articleUpdatedAt?": Date;
    "articleImages": ArticleImages[];
  }
export interface Book {
  ID?: number;
  title: string;
  author: string;
  isbn: string;
  description: string;
  publisher: string;
  numberOfPages: number;
  coverImage: string;
  CreatedAt: Date;
  UpdatedAt: Date;
}

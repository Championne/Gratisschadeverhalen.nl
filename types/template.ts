export interface Template {
  name: string;
  description: string;
  tags: string[];
  category: Category;
  version: string;
}

export interface Category {
  industry: string;
  contentType: string;
  platform: string;
  purpose: string;
}

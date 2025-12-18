// Definimos el objeto con los valores
export const Category = {
  SPRING: 'SPRING',
  ANGULAR: 'ANGULAR',
  JAVA: 'JAVA',
} as const;

// Creamos el tipo basado en los valores del objeto
export type Category = (typeof Category)[keyof typeof Category];

export interface BlogHome {
  id: number;
  title: string;
  author: string; 
  category: Category;
  createdAt: string; 
  totalComments: number;
}

export interface BlogDetail {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  category: Category;
}

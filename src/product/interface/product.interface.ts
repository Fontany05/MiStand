export interface ProductResponse {
  id: string;
  name: string;
  description: string;
  price: number;
  photo: string | null;
  available: boolean;
  entrepreneurId: string;
  createdAt: Date;
}

export interface PaginatedProductResponse {
  data: ProductResponse[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

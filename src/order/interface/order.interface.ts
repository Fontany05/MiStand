import { OrderStatus } from '@prisma/client';

export interface Order {
  id: string;
  status: OrderStatus;
  clientName: string;
  clientPhone: string;
  notes: string | null;
  productId: string;
  entrepreneurId: string;
  createdAt: Date;
}

export interface PaginatedOrderResponse {
  data: Order[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

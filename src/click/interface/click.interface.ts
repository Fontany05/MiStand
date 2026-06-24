export interface ClickResponse {
  id: string;
  productId: string;
  date: Date;
}

export interface ClickMetrics {
  productId: string;
  totalClicks: number;
}

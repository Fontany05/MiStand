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

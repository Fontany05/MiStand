export interface EntrepreneurProfile {
  id: string;
  name: string;
  email: string;
  standName: string;
  description: string | null;
  currentLocation: string | null;
  phone: string;
  createdAt: Date;
}

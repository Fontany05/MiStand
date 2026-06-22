export interface AuthResponse {
  token: string;
  entrepreneur: {
    id: string;
    name: string;
    email: string;
    standName: string;
  };
}

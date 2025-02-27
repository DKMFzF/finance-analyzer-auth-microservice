export interface LoginRequestBody {
  login: string;
  password: string;
}

export interface User {
  id: number;
  login: string;
}

export interface TokenPayload {
  userId: number;
  login: string;
}

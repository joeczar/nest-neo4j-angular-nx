export type JwtAccessToken = {
  access_token: string;
  expiresIn?: number;
};

export type JwtValidateResponse = {
  id: string;
  username: string;
};

export type JwtPayload = {
  sub: string; // Subject, usually user ID
  email: string;
};

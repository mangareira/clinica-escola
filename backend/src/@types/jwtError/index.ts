export interface JwtError extends Error {
  name: 'TokenExpiredError' | 'JsonWebTokenError' | 'NotBeforeError';
  expiredAt?: Date;
}

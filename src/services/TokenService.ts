import jwt, { JwtPayload } from 'jsonwebtoken';

class TokenService {
  tokens = [];
  constructor () {
  }

  generateTokens = (user) => {
    const accessToken = jwt.sign(user, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.JWT_ACCESS_EXP_IN });
    const refreshToken = jwt.sign(user, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXP_IN });
    return {
      accessToken,
      refreshToken
    };
  };

  verifyToken = (token, secretKey) => {
    const userData = jwt.verify(token, secretKey) as JwtPayload;
    return userData;
  };

  findToken = (token) => {
    const tokenFromDB = this.tokens.find((tokenFromDB) => tokenFromDB === token);
    return tokenFromDB;
  };

  saveToken = (token) => {
    this.tokens.push(token);
  };

  removeToken = (token) => {
    this.tokens.filter((tokenFromDB) => tokenFromDB !== token);
  };
}

export default new TokenService();
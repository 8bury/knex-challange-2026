const jwtConfig = {
  secret: String(process.env.JWT_SECRET),
  algorithm: String(process.env.JWT_ALGORITHM),
  expiresIn: Number(process.env.JWT_EXPIRES_IN),
};

export default jwtConfig;

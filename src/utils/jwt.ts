import jwt from 'jsonwebtoken';

export const createJWT = (slug: string) => {
  return jwt.sign({ slug }, process.env.JWT_SECRET as string);
  // Ainda aceita um terceiro parâmetro que pode ser usado para definições como tempo de expiração
};

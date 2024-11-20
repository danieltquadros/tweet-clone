import { Request, RequestHandler, Response } from 'express';
import { signUpSchema } from '../schemas/signUp';
import { createUser, findUserByEmail, findUserBySlug } from '../services/user';
import { error } from 'console';
import slug from 'slug';
import { compare, hash } from 'bcrypt-ts';
import { createJWT } from '../utils/jwt';
import { signInSchema } from '../schemas/signIn';

export const signUp: RequestHandler = async (req, res) => {
  // validar os dados recebidos
  const safeData = signUpSchema.safeParse(req.body);
  if (!safeData.success) {
    res.json({ error: safeData.error.flatten().fieldErrors });
    return;
  }

  // verificar e-mail
  const hasUser = await findUserByEmail(safeData.data.email);
  if (hasUser) {
    res.json({ error: 'e-mail already registered' });
  }

  // verificar slug
  let genSlug = true;
  let userSlug = slug(safeData.data.name);
  while (genSlug) {
    const hasSlug = await findUserBySlug(userSlug);
    if (hasSlug) {
      let slugSuffix = Math.floor(Math.random() * 999999).toString();
      userSlug = slug(safeData.data.name + slugSuffix);
    } else {
      genSlug = false;
    }
  }

  // gerar hash de senha
  const hashPassword = await hash(safeData.data.password, 10);

  // criar o usuário
  const newUser = await createUser({
    slug: userSlug,
    name: safeData.data.name,
    email: safeData.data.email,
    password: hashPassword,
  });

  // criar token
  const token = createJWT(userSlug);

  // retornar o resultado (token, user)
  res.status(201).json({
    token,
    user: {
      name: newUser.name,
      slug: newUser.slug,
      avatar: newUser.avatar,
    },
  });
};

export const signIn: RequestHandler = async (req, res) => {
  const safeData = signInSchema.safeParse(req.body);
  if (!safeData.success) {
    res.json({ error: safeData.error.flatten().fieldErrors });
    return;
  }

  const user = await findUserByEmail(safeData.data.email);
  if (!user) {
    res.status(401).json({ error: 'access denied' });
    return;
  }

  const verifyPass = await compare(safeData.data.password, user.password);
  if (!verifyPass) {
    res.status(401).json({ error: 'access denied' });
    return;
  }

  const token = createJWT(user.slug);

  res.json({
    token,
    user: {
      name: user.name,
      slug: user.slug,
      avatar: user.avatar,
    },
  });
};

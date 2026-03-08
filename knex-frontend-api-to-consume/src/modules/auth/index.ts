import { Router } from "express";
import login from "./services/login-user.service";
import register from "./services/register-user-and-vinculate-store.service";
import { celebrate, Joi, Segments } from "celebrate";

const authRoutes = Router();

authRoutes.post(
  "/register",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  register
);

authRoutes.post(
  "/login",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  login
);

export default authRoutes;

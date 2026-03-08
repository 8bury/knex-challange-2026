import { Router } from "express";
import createProductByUser from "./services/create-product-by-user";
import showProductsByUser from "./services/show-products-by-user";
import updateProductByUser from "./services/update-product-by-user";
import deleteProductByUser from "./services/delete-product-by-user";
import { celebrate, Joi, Segments } from "celebrate";

const productsRoutes = Router();

productsRoutes.post(
  "/",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number().required(),
      file_id: Joi.string().uuid().required(),
    }),
  }),
  createProductByUser
);

productsRoutes.get("/", showProductsByUser);

productsRoutes.put(
  "/:product_id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      product_id: Joi.number().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().optional(),
      description: Joi.string().optional(),
      price: Joi.number().optional(),
      index: Joi.number().optional(),
    }),
  }),
  updateProductByUser
);

productsRoutes.delete(
  "/:product_id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      product_id: Joi.number().required(),
    }),
  }),
  deleteProductByUser
);

export default productsRoutes;

import * as Joi from 'joi';
// these values or app.config values
export const JoiValidationSchema = Joi.object({
  PORT: Joi.number().default(3000),
  DB_URL: Joi.string().min(1).required(),
  CONTAINER_DB_NAME: Joi.string().min(1).required(),
  DB_USERNAME: Joi.string().min(1).required(),
  DB_PASSWORD: Joi.string().min(1).required(),
  DB_NAME: Joi.string().min(1).required(),
  // USER INFORMATION (admin)
  SUPER_USER: Joi.string().min(1).required(),
  SUPER_EMAIL: Joi.string().email(),
  SUPER_PASSWORD: Joi.string().required(),
  SUPER_FULLNAME: Joi.string().required(),
  ADMIN_USER: Joi.string().min(1).required(),
  ADMIN_EMAIL: Joi.string().email(),
  ADMIN_PASSWORD: Joi.string().required(),
  ADMIN_FULLNAME: Joi.string().required(),
  SALT: Joi.number().required(),
  // JWT
  JWT_SECRET: Joi.string().required(),
  // SEED PADDWORD
  SEED_PASSWORD: Joi.string().required(),
});

import Joi from 'joi';

export default {
  message: Joi.string().lowercase().required(),
};

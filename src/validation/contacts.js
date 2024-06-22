import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Name should be a type of text',
    'string.empty': 'Name cannot be an empty field',
    'string.min': 'Name should have a minimum length of {#limit}',
    'string.max': 'Name should have a maximum length of {#limit}',
    'any.required': 'Name is a required field',
  }),
  phoneNumber: Joi.number().required().messages({
    'number.base': 'Phone number should be a type of number',
    'any.required': 'Phone number is a required field',
  }),
  email: Joi.string().email().messages({
    'string.email': 'Email must be a valid email',
  }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': 'isFavourite should be a boolean',
  }),
  contactType: Joi.string().valid('work', 'home', 'personal').messages({
    'any.only': 'Contact type must be one of [work, home, personal]',
  }),
  personId: Joi.string(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.base': 'Name should be a type of text',
    'string.empty': 'Name cannot be an empty field',
    'string.min': 'Name should have a minimum length of {#limit}',
    'string.max': 'Name should have a maximum length of {#limit}',
    'any.required': 'Name is a required field',
  }),
  phoneNumber: Joi.number().messages({
    'number.base': 'Phone number should be a type of number',
    'any.required': 'Phone number is a required field',
  }),
  email: Joi.string().email().messages({
    'string.email': 'Email must be a valid email',
  }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': 'isFavourite should be a boolean',
  }),
  contactType: Joi.string().valid('work', 'home', 'personal').messages({
    'any.only': 'Contact type must be one of [work, home, personal]',
  }),
});

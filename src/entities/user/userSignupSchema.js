import Joi from "joi";

const customMessages = {
  "string.base": "{{#label}} must be a string",
  "string.empty": "Please enter {{#label}}",
  "any.required": "Please enter {{#label}}",
  "any.only": "{{#label}} must match {{#valids}}",
  // username, password
  "string.alphanum": "{{#label}} must only contain alpha-numeric characters",
  "string.min": "{{#label}} must be at least {{#limit}} characters long",
  "string.max": "{{#label}} must be at most {{#limit}} characters long",
  // email
  "string.email": "{{#label}} must be a valid email address"
};

const schema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(25)
    .required()
    .messages(customMessages),

  email: Joi.string().email().required().messages(customMessages),

  password: Joi.string().min(6).required().messages(customMessages),

  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords must match",
    "string.empty": "Please confirm password"
  })
}).with("password", "confirmPassword");

export default schema;

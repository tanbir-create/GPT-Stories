import Joi from "joi";
const ObjectId = require("mongoose").Types.ObjectId;

const customMessages = {
  "any.invalid": "Invalid {{#label}}",
  "string.base": "{{#label}} must be a string",
  "string.empty": "Please enter {{#label}}",
  "any.required": "Please enter {{#label}}",
  "any.only": "{{#label}} must match {{#valids}}"
};

const schema = Joi.object({
  user: Joi.string()
    .trim()
    .required()
    .custom((value, helpers) => {
      if (!ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    }, "MongoDB ObjectId")
    .description("MongoDB object id validation")
    .messages(customMessages),

  title: Joi.string().trim().required().messages(customMessages),

  url: Joi.string().uri().trim().required().messages(customMessages),

  category: Joi.string().trim().required().messages(customMessages),

  description: Joi.string().trim().optional(),

  images: Joi.optional()
});

export default schema;

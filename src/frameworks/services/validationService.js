import { AppError } from "@utils/error";

const validateOptions = {
  errors: {
    wrap: {
      label: false
    }
  },
  abortEarly: false
};

export default function validationService() {
  function validateObj(body, schema, options = validateOptions) {
    const { error, value } = schema.validate(body, options);

    if (error) {
      const customErrorMessages = error.details.map((err) => {
        return { [err.path[0]]: err.message };
      });
      throw new AppError(
        "Please enter valid data",
        400,
        "form_validation_error",
        {
          errors: customErrorMessages
        }
      );
    }

    return value;
  }

  return {
    validateObj
  };
}

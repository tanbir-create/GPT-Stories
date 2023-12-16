export default function validationService(service) {
  const validate = (body, schema, options) =>
    service.validateObj(body, schema, options);

  return {
    validate
  };
}

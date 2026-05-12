exports.validate = (schema, body) => {
  const { error } = schema.validate(body);

  if (error) {
    const err = new Error(error.details[0].message);
    err.statusCode = 400;
    throw err;
  }
};

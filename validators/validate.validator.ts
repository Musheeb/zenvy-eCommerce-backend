import Joi from "joi";

export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const validate = (schema: Joi.ObjectSchema, body: unknown) => {
  const { error } = schema.validate(body);

  if (error) {
    throw new AppError(error.details[0]?.message ?? "Validation Failed", 400);
  }
};

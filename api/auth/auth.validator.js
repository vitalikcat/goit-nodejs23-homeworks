import Joi from "@hapi/joi";

export const authValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details);
  } else {
    next();
  }
};

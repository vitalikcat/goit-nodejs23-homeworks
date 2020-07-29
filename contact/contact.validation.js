import Joi from "joi";

export const addContactValidation = (req, res, next) => {
  const validationRules = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
  });
  const validationResult = Joi.validate(req.body, validationRules);

  if (validationResult.error) {
    const requiredField = validationResult.error.details[0].path[0];

    return res.status(400).json({
      message: `missing required ${requiredField} field`,
    });
  } else {
    next();
  }
};

export const updateContactValidation = (req, res, next) => {
  const validationRules = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
  });
  const result = Joi.validate(req.body, validationRules);

  if (result.error || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: "missing  fields",
    });
  } else {
    next();
  }
};

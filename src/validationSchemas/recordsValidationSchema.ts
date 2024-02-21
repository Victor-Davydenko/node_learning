import Joi from 'joi';

export const recordValidationSchema = Joi.object({
  line: Joi.number().required(),
  valve: Joi.number().optional(),
  valves: Joi.when('valve', {
    not: Joi.exist(),
    then: Joi.array().items(Joi.number()).required(),
    otherwise: Joi.forbidden()
  }),
  start: Joi.number().min(0).max(1440).required(),
  end: Joi.number().min(0).max(1440).required(),
  type: Joi.string().valid('MM', 'Volume', 'Time').required(),
  amount: Joi.number().positive().required(),
  fertigation: Joi.boolean().required(),
  start_date: Joi.date().required(),
  machine: Joi.number().optional(),
  cycles: Joi.number().optional(),
  interval: Joi.number().optional(),
  field: Joi.any().required(),
  fert_recipe: Joi.number().optional()
});
const mongoose = require("mongoose");
const Joi = require("joi");

const establishmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  category: { type: String, required: true },
  capacity: { type: Number, required: true },
  imageURL: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

const Establishment = mongoose.model("establishment", establishmentSchema);

const validateEstablishment = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required(),
    category: Joi.string().required(),
    capacity: Joi.number().required(),
    imageURL: Joi.string().required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
  });
  return schema.validate(data);
};

module.exports = { Establishment, validateEstablishment };

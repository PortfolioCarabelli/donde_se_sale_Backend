const mongoose = require("mongoose");
const Joi = require("joi");

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  assistants: { type: Number, required: true },
  assistantsList: { type: Array, required: true },
  imageURL: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
});

const Event = mongoose.model("event", eventSchema);

const validateEvent = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required(),
    assistants: Joi.number().required(),
    imageURL: Joi.string().required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
  });
  return schema.validate(data);
};

module.exports = { Event, validateEvent };
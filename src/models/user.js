const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model('user', userSchema);

//Joi es un validador de schema
const validate = (data) => {
  const schema = Joi.object({
    password: Joi.string().required().label('Password'),
    lastName: Joi.string().required().label('Last Name'),
    email: Joi.string().email().required().label('Email'),
    firstName: Joi.string().required().label('First Name'),
  });

  return schema.validate(data);
};

module.exports = { User, validate };

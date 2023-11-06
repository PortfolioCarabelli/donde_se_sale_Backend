const mongoose = require('mongoose');
const Joi = require('joi');

const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  profilePicture: { type: String }, 
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  description: { type: String },
  birthDate: { type: Date },
  phone: { type: String },
  profession: { type: String },
});

const Profile = mongoose.model('profile', profileSchema);

const validateProfile = (data) => {
  const schema = Joi.object({
    userId: Joi.string().required().label('User ID'),
    profilePicture: Joi.string(),
    firstName: Joi.string().required().label('First Name'),
    lastName: Joi.string().required().label('Last Name'),
    description: Joi.string(),
    birthDate: Joi.date(),
    phone: Joi.string(),
    profession: Joi.string(),
  });

  return schema.validate(data);
};

module.exports = { Profile, validateProfile };

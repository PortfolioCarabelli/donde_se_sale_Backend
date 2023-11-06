const { Profile, validateProfile } = require('../models/profile');

class ProfileController {
  // Método para crear un perfil
  createProfile = async (req, res) => {
    try {
      const { error } = validateProfile(req.body);
      if (error) {
        return res.status(400).send({ message: error.details[0].message });
      }

      const profile = await new Profile({ ...req.body }).save();

      res.status(201).json({ profile });
    } catch (error) {
      console.error('Error creating profile:', error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  };

  // Método para obtener un perfil por ID
  getProfileById = async (req, res) => {
    try {
      // Buscar el perfil por ID en la base de datos
      const profile = await Profile.findById(req.params.id);
      if (!profile) {
        return res.status(404).send({ message: 'Profile not found' });
      }

      res.json({ profile });
    } catch (error) {
      console.error('Error fetching profile by ID:', error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  };

  // Método para obtener todos los perfiles
  getAllProfiles = async (req, res) => {
    try {
      const profiles = await Profile.find();
      res.json({ profiles });
    } catch (error) {
      console.error('Error fetching all profiles:', error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  };

  getProfileByUserId = async (req, res) => {
    try {
      const profile = await Profile.findOne({ userId: req.params.userId });
      if (!profile) {
        return res.status(404).send({ message: 'Profile not found for this user' });
      }
      console.log(profile)
      res.json({ profile });
    } catch (error) {
      console.error('Error fetching profile by user ID:', error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  };

  // Método para actualizar un perfil por su ID
  updateProfileById = async (req, res) => {
    try {

      console.log(req)
      const { error } = validateProfile(req.body);
      if (error) {
        return res.status(400).send({ message: error.details[0].message });
      }

      const updatedProfile = await Profile.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      console.log(updatedProfile)
      if (!updatedProfile) {
        return res.status(404).send({ message: 'Profile not found' });
      }

      res.json({ profile: updatedProfile });
    } catch (error) {
      console.error('Error updating profile by ID:', error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  };

  // Método para eliminar un perfil por su ID
  deleteProfileById = async (req, res) => {
    try {
      const deletedProfile = await Profile.findByIdAndDelete(req.params.id);
      
      if (!deletedProfile) {
        return res.status(404).send({ message: 'Profile not found' });
      }

      res.json({ message: 'Profile deleted successfully' });
    } catch (error) {
      console.error('Error deleting profile by ID:', error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  };
}

module.exports = ProfileController;

const { Establishment, validateEstablishment } = require('../models/establishment');


class EstablishmentController {
  getEstablishmentById = async (req, res) => {
    try {
      const establishment = await Establishment.findById(req.params.id);
      if (!establishment) return res.status(404).json({ error: 'Establishment not found' });

      res.json(establishment);
    } catch (error) {
      console.error('There was an error while trying to get the establishment', error);
      res.status(500).json({ msg: 'Internal Server Error' });
    }
  };

  getAllEstablishments = async (req, res) => {
    try {
      const establishments = await Establishment.find();

      res.json(establishments);
    } catch (error) {
      console.error('There was an error while trying to get all establishments', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  createEstablishment = async (req, res) => {
    try {
      const establishmentData = req.body;
     
      const { error } = validateEstablishment(establishmentData);
      if (error)
        return res.status(400).json({ error: error.details[0].message });

      const establishment = new Establishment(establishmentData);

      await establishment.save();

      res.json(establishment);
    } catch (error) {
      console.error('There was an error while trying to create an establishment', error);

      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  updateEstablishment = async (req, res) => {
    try {
      const establishmentData = {
        ...req.body,
      };

      const { error } = validateEstablishment(establishmentData);
      if (error)
        return res.status(400).json({ error: error.details[0].message });

      const establishment = await Establishment.findByIdAndUpdate(req.params.id, establishmentData, {
        new: true,
      });

      if (!establishment) return res.status(404).json({ error: 'Establishment not found' });

      res.json(establishment);
    } catch (error) {
      console.error('There was an error while trying to update the establishment', error);

      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  deleteEstablishment = async (req, res) => {
    try {
      const establishment = await Establishment.findByIdAndRemove(req.params.id);

      if (!establishment) return res.status(404).json({ error: 'Establishment not found' });

      res.json(establishment);
    } catch (error) {
      console.error('There was an error while trying to delete the establishment', error);

      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
}

module.exports = EstablishmentController;

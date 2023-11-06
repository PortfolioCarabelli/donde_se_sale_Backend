const express = require('express');
const establishmentController = require('../controllers/establishment');
const authenticateUser = require('../middleware/auth');

const router = express.Router();
const EstablishmentController = new establishmentController();

// get all establishments
router.get('/', authenticateUser, EstablishmentController.getAllEstablishments);

// get establishment by id
router.get('/:id', EstablishmentController.getEstablishmentById);

// create establishment
router.post('/', authenticateUser, EstablishmentController.createEstablishment);

// update establishment by id
router.put('/:id', authenticateUser, EstablishmentController.updateEstablishment);

// delete establishment by id
router.delete('/:id', authenticateUser, EstablishmentController.deleteEstablishment);

module.exports = router;

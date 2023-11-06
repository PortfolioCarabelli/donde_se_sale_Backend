const router = require('express').Router();
const ProfileController = require('../controllers/profile');

const profileController = new ProfileController();

// Ruta para crear un nuevo perfil
router.post('/', profileController.createProfile);

// Ruta para obtener todos los perfiles
router.get('/', profileController.getAllProfiles);

// Ruta para obtener un perfil por ID
router.get('/:id', profileController.getProfileById);

// Ruta para actualizar un perfil por ID
router.put('/:id', profileController.updateProfileById);

// Ruta para eliminar un perfil por ID
router.delete('/:id', profileController.deleteProfileById);

// Ruta para obtener un perfil por ID de usuario
router.get('/user/:userId', profileController.getProfileByUserId);

module.exports = router;

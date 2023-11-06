const express = require('express');
const eventController = require('../controllers/event');
const authenticateUser = require('../middleware/auth');

const router = express.Router();
const EventController = new eventController();

// get all events
router.get('/', authenticateUser, EventController.getAllEvents);

// get event by id
router.get('/:id', EventController.getEvent);

// create event
router.post('/', authenticateUser, EventController.createEvent);

// update event by id
router.put('/:id', authenticateUser, EventController.updateEvent);

// delete event by id
router.delete('/:id', authenticateUser, EventController.deleteEvent);

// confirm event attendance
router.put('/attendance/:id', authenticateUser, EventController.confirmEventAttendance);

router.delete('/attendance/:id', authenticateUser, EventController.deleteEventAttendance);

module.exports = router;

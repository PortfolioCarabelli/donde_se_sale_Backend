const { Event, validateEvent } = require('../models/event');

class EventController {
  getEvent = async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);

      if (!event) return res.status(404).json({ error: 'Event not found' });

      res.json(event);
    } catch (error) {
      console.error('there was an error where trying to get the event', error);
      res.status(500).json({ msg: 'Internal Server Error' });
    }
  };

  getAllEvents = async (req, res) => {
    try {
      const events = await Event.find();

      res.json(events);
    } catch (error) {
      console.error('there was an error where trying to get all events', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  createEvent = async (req, res) => {
    try {
      // Agrega las fechas de inicio y finalización al objeto de solicitud
      const eventData = req.body;

      const { error } = validateEvent(eventData);
      if (error)
        return res.status(400).json({ error: error.details[0].message });

      const event = new Event(eventData);

      await event.save();

      res.json(event);
    } catch (error) {
      console.error(
        'there was an error where trying to create an event',
        error,
      );

      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  updateEvent = async (req, res) => {
    try {
      // Agrega las fechas de inicio y finalización al objeto de solicitud
      const eventData = {
        ...req.body,
      };

      const { error } = validateEvent(eventData);
      if (error)
        return res.status(400).json({ error: error.details[0].message });

      const event = await Event.findByIdAndUpdate(req.params.id, eventData, {
        new: true,
      });

      if (!event) return res.status(404).json({ error: 'Event not found' });

      res.json(event);
    } catch (error) {
      console.error(
        'there was an error while trying to update the event',
        error,
      );

      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  deleteEvent = async (req, res) => {
    try {
      // TODO poner validacion que el user que lo borra sea el mismo que lo creo
      // lo mismo para updateEvent
      const event = await Event.findByIdAndRemove(req.params.id);

      if (!event) return res.status(404).json({ error: 'Event not found' });

      res.json(event);
    } catch (error) {
      console.error(
        'there was an error while trying to delete the event',
        error,
      );

      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  confirmEventAttendance = async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);

      if (!event) return res.status(404).json({ error: 'Event not found' });

      if (
        event.assistantsList.some((assistant) => assistant._id === req.user._id)
      ) {
        res.status(401).json({ error: 'user already registered' });
      } else {
        event.assistantsList.push({
          _id: req.user._id,
          firstName: req.user.firstName,
          lastName: req.user.lastName,
        });

        await event.save();

        res.json(event);
      }
    } catch (error) {
      console.error(
        'there was an error where trying to confirm the event attendance',
        error,
      );
      
      res.status(500).json({ msg: 'Internal Server Error' });
    }
  };

  deleteEventAttendance = async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);

      if (!event) return res.status(404).json({ error: 'Event not found' });

      if (
        !event.assistantsList.some((assistant) => assistant._id === req.user._id)
      ) {
        res.status(401).json({ error: 'user is not registered' });
      } else {

        event.assistantsList = event.assistantsList.filter(assistant => assistant._id !== req.user._id)
        await event.save();

        res.json(event);
      }
    } catch (error) {
      console.error(
        'there was an error where trying to delete the event attendance',
        error,
      );
      
      res.status(500).json({ msg: 'Internal Server Error' });
    }
  };
}

module.exports = EventController;

const express = require('express');
const router = express.Router();
const EventController = require('../controllers/eventController');

// Define las rutas de eventos y los controladores correspondientes
router.post('/events', EventController.createEvent);
router.get('/events/:id', EventController.getEventById);

module.exports = router;

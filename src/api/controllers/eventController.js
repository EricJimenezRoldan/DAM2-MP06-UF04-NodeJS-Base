const express = require('express');
const mongoose = require('mongoose');
const dbConfig = require('./config/db');
const userRoutes = require('./api/routes/userRoutes');
const eventRoutes = require('./api/routes/eventRoutes'); // Importa las rutas de eventos
const Event = require('./api/models/event');
const app = express();

app.use(express.json());
app.set('json spaces', 2); // Formatea la salida JSON

mongoose.connect(dbConfig.MONGODB_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch(err => console.error("No se pudo conectar a MongoDB", err));

app.get('/api/health', (req, res) => {
  res.json({ status: "OK" });
});

// Usa las rutas de eventos con el prefijo /api
app.use('/api', eventRoutes);

// POST endpoint para insertar un evento
app.post('/api/events', async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).send(event);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Endpoint para recuperar un evento por ID
app.get('/api/events/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).send("El evento no se ha encontrado.");
    }
    res.send(event);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Usa las rutas de usuarios con el prefijo /api
app.use('/api', userRoutes);

module.exports = app;

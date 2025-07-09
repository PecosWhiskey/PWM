require('dotenv').config(); //Carica le variabili d'ambiente dal file '.env' globalmente per tutta l'applicazione
const express = require('express');
const app = express();
const authRoutes = require('./auth/authRoutes/authRoutes.js');
const db = require('./database/dbAdmin');


app.use(express.json());


const cors = require('cors');
app.use(cors());


app.use(cors({
  origin: 'http://localhost:8100', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Authorization'] 
}));

app.use('/api/auth', authRoutes);

// Avvio server
const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
  console.log(`Server in ascolto sulla porta ${PORT}`);
});
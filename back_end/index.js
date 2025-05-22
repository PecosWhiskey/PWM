const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'Saymyname2503.', // o la tua password
  database: 'Project_PWM'
});

db.connect((err) => {
  if (err) {
    console.error('Errore di connessione:', err);
    return;
  }
  console.log('Connesso al database MySQL');
});

// Esempio di endpoint
app.get('/voli', (req, res) => {
  const sql = `
    SELECT v.idVolo, a1.Nome AS Partenza, a2.Nome AS Arrivo, v.OraPartenza, v.OraArrivo, v.Prezzo
    FROM Volo v
    JOIN Aeroporto a1 ON v.Partenza = a1.idAeroporto
    JOIN Aeroporto a2 ON v.Arrivo = a2.idAeroporto;
  `;
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server backend avviato su http://localhost:${PORT}`);
});

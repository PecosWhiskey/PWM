const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'saymyname2503.', // o la tua password
  database: 'Project_PWM'
});

db.connect((err) => {
  if (err) {
    console.error('Errore di connessione:', err);
    return;
  }
  console.log('Connesso al database MySQL');
});

// endpoint - query generali
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

app.get('/ricercavoli', (req, res) => {
  const sql = `
    SELECT v.idVolo, ap.Nome AS AeroportoPartenza, pp.Città AS CittàPartenza, ad.Nome AS AeroportoArrivo, 
       pd.Città AS CittàArrivo, v.OraPartenza, v.OraArrivo, v.Prezzo
    FROM Volo v
    JOIN Aeroporto ap ON v.Partenza = ap.idAeroporto
    JOIN Posizione pp ON ap.idPosizione = pp.idPosizione
    JOIN Aeroporto ad ON v.Arrivo = ad.idAeroporto
    JOIN Posizione pd ON ad.idPosizione = pd.idPosizione
    WHERE pp.Città = 'Milano' OR pp.Città = 'Roma';
  `;
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
});

app.get('/aeroporti', (req, res) => {
  const sql = `
    SELECT a.idAeroporto, a.Nome, a.idPosizione, p.Città
    FROM Aeroporto as a JOIN Posizione as p ON a.idPosizione=p.idPosizione
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

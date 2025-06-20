const jwt = require('jsonwebtoken');

function verifyToken(req, res, next){
    const authHeader = req.headers['authorization']; //dalla richiesta recupera il campo "authorization" che contiene il token
    const token = authHeader && authHeader.split(' ')[1];  //se 

  if (!token) {
    return res.status(401).json({ message: 'Token mancante' });
  }
  //Verifica se il token è valido, confrontandolo con la chiave con cui è stato firmato
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token non valido o scaduto' });
    }
    //aggiunge un nuovo campo alla richiesta "req.user" che contiene il payload del token ovvero idCliente ed email,
    req.user = decoded;
    next(); //passa i dati req.user alla funzione dell'authController
  });
}

module.exports = verifyToken;
const { body, validationResult } = require('express-validator');

const loginValidatorAdmin = [
    body('username').notEmpty().withMessage('Username obbligatorio'),
    body('password').notEmpty().withMessage('Password obbligatoria')
];

const loginValidatorClient = [
    body('email').notEmpty().withMessage('Email obbligatoria'),
    body('password').notEmpty().withMessage('Password obbligatoria')
];

const registerValidatorClient = [
  body('email').notEmpty().withMessage('Email obbligatoria'),
  body('password').notEmpty().withMessage('Password obbligatoria')
]

const datiVoloValidator = [
  body('partenza').notEmpty().withMessage('città di partenza obbligatorio').isLength({max: 3}).withMessage("Il codice dell'aeroporto può essere dilunghezza massima 3"),
  body('destinazione').notEmpty().withMessage('città di destinazione obbligatoria').isLength({max: 3}).withMessage("Il codice dell'aeroporto può essere dilunghezza massima 3"),
  body('oraPartenza').notEmpty().withMessage('orario di partenza obbligatorio'),
  body('oraArrivo').notEmpty().withMessage('orario di arrivo obbligatorio'),
  body('prezzo').notEmpty().withMessage('prezzo obbligatorio'),
]

const idVoloValidator = [
  body('idVolo').notEmpty().withMessage('id volo obbligatorio'),
]

const creationTicketsValidator = [
    body('idVolo').notEmpty().withMessage('codice del volo obbligatorio'),
    body('idCliente').notEmpty().withMessage('id del cliente obbligatorio'),
    body('idPasseggero').notEmpty().withMessage('id del passeggero obbligatorio'),
]

const createPassengerValidator = [
  body('idPassegero').notEmpty().withMessage('id del passeggero obbligatorio'),
  body('nome').notEmpty().withMessage('nome obbligatorio'),
  body('cognome').notEmpty().withMessage('cognome obbligatorio'),
  body('dataNascita').notEmpty().withMessage('data di nascita obbligatorio'),
  body('documentoID').notEmpty().withMessage("numero di carta d'identità obbligatorio"),
]

const idClienteValidator = [
  body('idCliente').notEmpty().withMessage('id del Ccliente obbligatorio'),
]


const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
};
  
module.exports = {loginValidatorAdmin, loginValidatorClient, registerValidatorClient, datiVoloValidator, idVoloValidator, 
    creationTicketsValidator, createPassengerValidator, idClienteValidator, validate};
const express = require('express');
const router = express.Router();
const authControllerAdmin = require('../authController/authControllerAdmin');
const authControllerBiglietti = require('../authController/authControllerBiglietti');
const { loginValidatorAdmin, loginValidatorClient, registerValidatorClient, datiVoloValidator, idVoloValidator, 
    creationTicketsValidator, createPassengerValidator, idClienteValidator, validate } = require('../authValidators/authValidators');

// Login
router.post('/login-admin', loginValidatorAdmin, validate, authControllerAdmin.login);

//Registrazione 
// router.post('/registrazione-admin', registerValidator, validate, authControllerAdmin.register);

//Creazione di un nuovo volo
router.post('/creazione-volo', datiVoloValidator, validate, authControllerBiglietti.voloCreation);

//Modifica di un volo
router.post('/modifica-volo', idVoloValidator, datiVoloValidator, validate, authControllerBiglietti.voloModification);

//Ricerca voli
router.post('/ricerca-volo', authControllerBiglietti.voloSearch);

// Verifica autenticazione
router.post('/verify', authControllerAdmin.verify);

//Login del cliente
router.post('/login-cliente', loginValidatorClient, validate, authControllerBiglietti.loginClient);

//Registrazione del cliente
router.post('/registrazione-cliente', registerValidatorClient, validate, authControllerBiglietti.registerClient);

//Creazione del biglietto
router.post('/creazione-biglietto', creationTicketsValidator, validate, authControllerBiglietti.createTicket);

//Ricerca biglietti acquistati dal cliente
router.post('/ricerca-biglietti', idClienteValidator, validate, authControllerBiglietti.returnTickets);

//Creazione passeggero
router.post('/inserimento-passeggero', createPassengerValidator, validate, authControllerBiglietti.createPassenger);

module.exports = router;
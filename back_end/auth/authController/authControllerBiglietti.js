const bigliettiService = require('../authService/authServiceBiglietti');
const jwt = require('jsonwebtoken'); //modulo che crea e verifica i token JWT

class AuthControllerBiglietti {
    static async voloCreation(req,res){
        console.log('voloCreation: ',req.body);
        try{
            const created = await bigliettiService.generaVolo(req.body);
            res.status(201).json({
                succes: true,
                data: created
            });
        } catch(err){
            res.status(400).json({
                success: false,
                message: err.message
            });
        }
    }

    static async voloModification(req,res){
        console.log('voloModification: ',req.body);
        try{
            const created = await bigliettiService.modificaVoli(req.body);
            res.status(201).json({
                succes: true,
                data: created
            });
        } catch(err){
            res.status(400).json({
                success: false,
                message: err.message
            });
        }
    }

    static async decreseSeats(req,res){
        console.log('decreseSeats: ', req.body);
        try{
            const created = await bigliettiService.decrementaPosti(req.body);
            res.status(201).json({
                succes: true,
                data: created
            });
        }catch(err){
            res.status(400).json({
                success: false, 
                message: err.message
            })
        }
    }

    static async voloSearch(req,res){
        console.log('voloSearch:', req.body);
        try{
            const voli = await bigliettiService.cercaVolo(req.body);
            res.status(200).json({
                success:true,
                data:voli
            });
        } catch(err){
            res.status(400).json({
                success:false,
                message:err.message
            });
        }
    }

    static async loginClient(req,res){
        try{
            const cliente = await bigliettiService.loginCliente(req.body);

            // Creazione del token JWT
            const token = jwt.sign( 
                { idCliente: cliente.idCliente, email: cliente.email, role: 'cliente' },
                process.env.JWT_SECRET,
                { expiresIn: '2h' } //Imposta la durata del token a 24 ore
            );

            res.status(200).json({
                success:true,
                token: token, 
                data: cliente
            });
        } catch(err){
            res.status(400).json({
                success:false,
                message:err.message
            });
        }
    }

    static async registerClient(req,res){
        try{
            console.log("Dati ricevuti in authController: ", req.body);
            const cliente = await bigliettiService.registrazioneCliente(req.body);

            //Creazione del token
            const token = jwt.sign( 
                { idCliente: cliente.idCliente, email: cliente.email, role:'cliente' },
                process.env.JWT_SECRET,
                { expiresIn: '2h' } 
            );

            res.status(201).json({
                success:true,
                token: token,
                data: cliente
            });
        } catch(err){
            res.status(400).json({
                success:false,
                message:err.message
            });
        }
    }

    static async createTicket(req,res){
        try{
            const biglietto = await bigliettiService.createBiglietto(req.body);
            res.status(201).json({
                success:true,
                data: biglietto
            });
        } catch(err){
            res.status(400).json({
                success:false,
                message:err.message
            });
       }
    }

    static async ticketModification(req,res){
        try{
            const biglietto = await bigliettiService.modificaTicket(req.body);
             res.status(201).json({
                succes: true,
                data: biglietto
            });
        }catch(err){
             res.status(400).json({
                success: false, 
                message: err.message
            })
        }
    }

    static async findTicket(req,res){
        try{
            const biglietto = await bigliettiService.returnTicket(req.body);
             res.status(200).json({
                success:true,
                data: biglietto
            });
        }catch(err){
            res.status(400).json({
                success:false,
                message:err.message
            });
        }
    }

    static async returnTickets(req,res){
        try{ //in questo modo è più sicuro che vengano cercati i biglietti del cliente il cui token è stato validato
            const biglietti = await bigliettiService.returnBiglietti(req.user.idCliente);

            res.status(200).json({
                success:true,
                data: biglietti
            });
        } catch(err){
            res.status(400).json({
                success:false,
                message:err.message
            });
        }
    }

    static async returnTicketsAdmin(req,res){
        try{
            const biglietti = await bigliettiService.returnBigliettiAdmin();

            res.status(200).json({
                success:true,
                data: biglietti
            });
        } catch(err){
            res.status(400).json({
                success:false,
                message:err.message
            });
        }
    }

    static async returnFlightsForAdmin(req,res){
        try{
            const voli = await bigliettiService.returnForAdmin();

            res.status(200).json({
                success:true,
                data: voli
            });
        } catch(err){
            res.status(400).json({
                success:false,
                message:err.message
            });
        }
    }

    static async returnForCheckIn(req,res){
        try{
            const biglietto = await bigliettiService.returnForCheckIn(req.body);

            res.status(200).json({
                success:true,
                data: biglietto,
            });
        }
        catch(err){
            res.status(400).json({
                success:false,
                message:err.message
            });
        }
    }

    static async createPassenger(req,res){
        try{
            const passeggero = await bigliettiService.createPasseggero(req.body);
            
            res.status(201).json({
                success:true,
                data: passeggero
            });
        } catch(err){
            res.status(400).json({
                success:false,
                message:err.message
            });
        }
    }
}

module.exports = AuthControllerBiglietti;
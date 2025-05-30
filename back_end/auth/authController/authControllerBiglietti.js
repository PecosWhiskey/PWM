const bigliettiService = require('../authService/authServiceBiglietti');

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
            res.status(200).json({
                success:true,
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
            const cliente = await bigliettiService.registrazioneCliente(req.body);
            res.status(201).json({
                success:true,
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

    static async returnTickets(req,res){
        try{
            const biglietti = await bigliettiService.returnBiglietti(req.body);

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
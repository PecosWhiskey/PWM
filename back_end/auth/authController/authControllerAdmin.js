const authServiceAdmin = require('../authService/authServiceAdmin');

class AuthControllerAdmin{

     static async login(req,res){
      try{
        console.log("Valori inseriti dall'admin ",req.body);
        const admin = await authServiceAdmin.loginAdmin(req.body);
        res.status(201).json({
          succes: true,
          data: admin
        });
      } catch(err){
          res.status(400).json({
            success: false,
            message: err.message
          });
      }
    }
    
    static async verify(req, res) {
        try {
          const admin = await authServiceAdmin.verifyAdmin(req.admin.id);
          res.json({
            success: true,
            data: admin
          });
        } catch (error) {
          res.status(401).json({
            success: false,
            message: error.message
          });
        }
      }
}

module.exports = AuthControllerAdmin;
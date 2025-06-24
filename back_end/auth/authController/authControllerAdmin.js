const authServiceAdmin = require('../authService/authServiceAdmin');
const jwt = require('jsonwebtoken');

class AuthControllerAdmin{

     static async login(req,res){
      try{
        console.log("Valori inseriti dall'admin ",req.body);
        const admin = await authServiceAdmin.loginAdmin(req.body);

        //Creazione del token JWT
        const token = jwt.sign(
          {idAdmin: admin.id, email: admin.email, role: 'admin'},
          process.env.JWT_SECRET,
          { expiresIn: '2h' }
        )

        res.status(201).json({
          succes: true,
          token: token,
          data: admin
        });
      } catch(err){
          res.status(400).json({
            success: false,
            message: err.message
          });
      }
    }
    
    // static async verify(req, res) {
    //     try {
    //       const admin = await authServiceAdmin.verifyAdmin(req.admin.id);
    //       res.json({
    //         success: true,
    //         data: admin
    //       });
    //     } catch (error) {
    //       res.status(401).json({
    //         success: false,
    //         message: error.message
    //       });
    //     }
    //   }
}

module.exports = AuthControllerAdmin;
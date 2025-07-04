const admin = require('../../models/admin.js');

class AuthServiceAdmin {
      
    static async loginAdmin({email, password}){
      console.log("loginAdmin service: ", email, password)  
      try{
            const user = await admin.findByEmail(email);  
           
            if(!user){
                throw new Error("Credenziali non valide!");
            }

            const pass = await admin.comparePassword(password, user.password);

            if(!pass ){
                throw new Error("Credenziali non valide!");
            }

            return user;

        }catch (err) {
            console.log("Errore da loginAdmin : ", err.message);
            throw err;
        }
    }

    // static async verifyAdmin(ID) {
    //     try {
    //       const adminID = await admin.findById(ID);
    //       if (!adminID) {
    //         throw new Error('Admin non trovato');
    //       }
    //       return adminID;
    //     } catch (error) {
    //       console.log("Errore da verifyAdmin: ", error.message);
    //     }
    // }
}

module.exports = AuthServiceAdmin;
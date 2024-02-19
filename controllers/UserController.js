const { findEmail } = require("../models/User");
var User = require("../models/User")
class UserController{

    async index(req, res){

    }

    async create(req, res){
        var {email, name, password} = req.body;
        if (email == undefined) {
            res.status(403);
            res.json({Erro: "o e-mail é inválido!"})
            return;
        }

        var emailExists = await User.findEmail(email);
        if (emailExists) {
            res.status(406);
            res.json({err: "O e-mail já está cadastrado!s"})
            return;
        }
            await User.new(email,password,name);
            res.status(200);
            res.send("Tudo Ok!")
    }
}

module.exports = new UserController();
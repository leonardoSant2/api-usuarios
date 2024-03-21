var User = require("../models/User");
var PasswordToken = require("../models/PasswordTokens");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

var secret = "dasdsffdgfh,çg,fdg,f,f,f,fg,fg,dçfgfçdgçl,";

class UserController{

    async index(req, res){
        var users = await User.findAll();
        res.json(users);
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

    async findUser(req,res){
        var id = req.params.id;
        var user = await User.findById(id);
        if (user == undefined) {
            res.status(404);
            res.json({Error: "Usuário não encontrado!"})
            
        } else {
            res.status(200);
            res.json(user);
        }
    }

    async edit(req, res){
        var {id, name, role, email} = req.body;
        var result = await User.update(id,email,name,role);
        if (result != undefined) {
            if (result.status) {
                res.status(200);
                res.send("tudo OK!")
            }else{
                res.status(406);
                res.json(result.err);

            }
        }else{
            res.status(406);
            res.send("Ocorreu um erro no servidor!");
        }
    }

    async remove(req,res){
        var id = req.params.id;
        var result = await User.delete(id);
        if (result.status) {
            res.status(200);
            res.send("Tudo ok");
        } else {
            res.status(406);
            res.send(result.err);
        }
    }

    async recoverPassword(req,res){
        var email = req.body.email;
        var result = await PasswordToken.create(email);
        if (result.status) {
            res.status(200);
            res.send("" + result.token);
        } else {
            res.status(406);
            res.send(result.err);
        }

    }

    async changePassword(req,res){
        var token = req.body.token;
        var password = req.body.password;

        var isTokenValid = await PasswordToken.validate(token);

        if (isTokenValid.status) {
            await User.changePassword(password, isTokenValid.token.user_id,isTokenValid.token.token);
            res.status(200);
            res.send("Senha alterada");
        } else {
            console.log(isTokenValid);
            res.status(406);
            res.send("Token inválido");
            
        }

    }

    async login(req, res){
        var {email, password } = req.body;

        var user = await User.findByEmail(email);

        if (user != undefined) {
            var result = await bcrypt.compare(password, user.password);
            if (result) {
                var token = jwt.sign({ email: user.email, role: user.role}, secret);
                res.status(200);
                res.json({ token: token});
            } else {
            res.status(406);
            res.send("Senha incorreta");    
            }
        } else {
            res.json({status: false});
        }
    }
}

module.exports = new UserController();
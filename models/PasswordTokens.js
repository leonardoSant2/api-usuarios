var knex = require("../database/connection");
var User = require("./User");

class PasswordToken{
    async create(email){
        var user = await User.findByEmail(email);
        if (user != undefined) {
            try {
                var token = Date.now();
                await knex.insert({
                    user_id: user.id,
                    used: 0,
                    token: token
                }).table("passwordtokens");
                return {status: true, token: token}
            } catch (error) {
                console.log(error);
                return {status: false, err: error}
            }

        } else {
            return {status: false, err: "O usuário não existe no banco de dados!"}
        }
    }

    async validate(token){
        try {
            var result = await knex.select().where({token: token}).table("passwordtokens");

            if (result.length > 0) {
                var tk = result[0];
                if (tk.used) {
                    return {status: false};
                   
                } else {
                    return {status: true, token: tk};
                }
            } else {
                return {status: false};
            }
        } catch (error) {
            console.log(error);
            return false
        }
    }

}

module.exports = new PasswordToken();
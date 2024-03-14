var knex = require("../database/connection");
var User = require("./User");

class PasswordTokens {

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


}

module.exports = new PasswordTokens();
var express = require("express")
var app = express();
var router = express.Router();
var UserController = require("../controllers/UserController");
var AdminAuth = require("../middleware/AdminAuth");

router.post('/user',UserController.create);
router.get('/user',UserController.index);
router.get('/user/:id',UserController.findUser);
router.put('/user',AdminAuth,UserController.edit);
router.delete('/user/:id',AdminAuth,UserController.remove);
router.post('/recoverpassword',UserController.recoverPassword);
router.post('/changepassword',UserController.changePassword);
router.post('/login', UserController.login);
router.post('/validate',AdminAuth, UserController.validate);
module.exports = router;
const routes = require("express").Router()
const UserController = require("../controllers/userController")

routes.post("/expedition", UserController.checkExpedition)

module.exports = routes
const express = require('express')

const router = express.Router()
const UserController = require('../controllers/userControllers')

router.post("/signup", UserController.signUp);
router.post("/login", UserController.login);
router.get("/", UserController.get_all);

module.exports = router
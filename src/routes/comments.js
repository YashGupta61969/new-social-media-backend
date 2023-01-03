const express = require('express')

const router = express.Router()
const checkAuth = require('../middlewares/checkAuth')
const commentsControllers = require('../controllers/commentsControllers')

router.get("/:id",checkAuth, commentsControllers.get_comments);
router.post("/",checkAuth, commentsControllers.comment);
router.patch("/:id",checkAuth, commentsControllers.update);
router.delete("/:id",checkAuth, commentsControllers.delete);

module.exports = router
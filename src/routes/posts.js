const express = require('express')
const multer = require('multer');
const path = require('path')
const router = express.Router()
const checkAuth = require('../middlewares/checkAuth')
const postControllers = require('../controllers/postControllers')

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//       cb(null, 'Images')
//   },
//   filename: (req, file, cb) => {
//       cb(null, Date.now() + path.extname(file.originalname))
//   }
// })

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: '1000000' },
//   fileFilter: (req, file, cb) => {
//       const fileTypes = /jpeg|jpg|png|gif/
//       const mimeType = fileTypes.test(file.mimetype)  
//       const extname = fileTypes.test(path.extname(file.originalname))

//       if(mimeType && extname) {
//           return cb(null, true)
//       }
//       cb('Give proper files formate to upload')
//   }
// }).single('image')

router.get("/", checkAuth, postControllers.get_all);
// router.get("/:id", upload, checkAuth,postControllers.get_one);
router.post("/", checkAuth,postControllers.upload);
router.delete("/:id", checkAuth,postControllers.delete);
router.patch("/:id", checkAuth,postControllers.update);

module.exports = router
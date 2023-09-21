const express = require('express');
const app = express();
const router = express.Router();
const productController = require('../app/controllers/productController')

const multer = require('multer');

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('invalid image type');

        if(isValid) {
            uploadError = null
        }
      cb(uploadError, 'public/uploads')
    },
    filename: function (req, file, cb) {
        
      const fileName = file.originalname.split(' ').join('-');
      const extension = FILE_TYPE_MAP[file.mimetype];
      cb(null, `${fileName}-${Date.now()}.${extension}`)
    }
  })
  
const uploadOptions = multer({ storage: storage })

router.put('/update/:id',productController.update1Product)
router.get('/featured/:count',productController.showFeaturedProduct)
router.get('/featured',productController.showFeaturedProduct)
router.get('/:id',productController.showDetails)
router.delete('/delete/:id',productController.deleteProduct)
router.get('/',productController.index)
router.post('/',uploadOptions.single('image'),productController.create)


module.exports = router
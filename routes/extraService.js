var express = require('express');
var router = express.Router();
var extraServiceController = require('../controllers/extraService');


/* GET home page. */
router.get('/', extraServiceController.show);
// router.post('/:id', extraServiceController.add);
router.post('/:id?', extraServiceController.add);
router.get('/delete/:id', extraServiceController.delete);

// router.delete("/",extraServiceController.delete);

module.exports = router;

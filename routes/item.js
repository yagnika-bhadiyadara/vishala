var express = require('express');
var router = express.Router();
var itemController = require('../controllers/Item');

/* GET home page. */
router.get('/', itemController.show);
// router.post('/:id', itemController.add);
router.post('/:id?', itemController.add);
router.get('/delete/:id', itemController.delete);

// router.delete("/",itemController.delete);

module.exports = router;

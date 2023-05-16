var express = require('express');
var router = express.Router();
var hallController = require('../controllers/Hall');

/* GET home page. */
router.get('/', hallController.show);
// router.post('/:id', itemController.add);
router.post('/:id?', hallController.add);
router.get('/delete/:id', hallController.delete);

// router.delete("/",itemController.delete);

module.exports = router;
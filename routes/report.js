var express = require('express');
var router = express.Router();
var reportController = require('../controllers/Report');

router.get('/', reportController.show);

// router.post('/:id?', reservationController.add);
// router.get('/delete/:id', reservationController.delete);

module.exports = router;
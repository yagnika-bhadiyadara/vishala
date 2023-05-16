var express = require('express');
var router = express.Router();
var reservationController = require('../controllers/Reservation');

/* GET home page. */
router.get('/', reservationController.show);
// router.post('/search', reservationController.show);
router.post('/:id?', reservationController.add);

module.exports = router;
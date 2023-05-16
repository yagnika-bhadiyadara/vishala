var express = require('express');
var router = express.Router();
var reservationController = require('../controllers/ReservationShow');

router.get('/', reservationController.show);

// router.post('/:id?', reservationController.add);
router.get('/delete/:id', reservationController.delete);

module.exports = router;
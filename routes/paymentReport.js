var express = require('express');
var router = express.Router();
var paymentReportController = require('../controllers/paymentReport');

router.get('/', paymentReportController.show);

// router.post('/:id?', reservationController.add);
// router.get('/delete/:id', dashboardController.delete);

module.exports = router;
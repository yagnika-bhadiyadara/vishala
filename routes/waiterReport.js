var express = require('express');
var router = express.Router();
var waiterReportController = require('../controllers/waiterReport');

router.get('/', waiterReportController.show);

// router.post('/:id?', reservationController.add);
// router.get('/delete/:id', dashboardController.delete);

module.exports = router;
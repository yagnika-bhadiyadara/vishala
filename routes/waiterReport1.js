var express = require('express');
var router = express.Router();
var waiterReport1Controller = require('../controllers/waiterReport1');

router.get('/', waiterReport1Controller.show);

// router.post('/:id?', reservationController.add);
// router.get('/delete/:id', dashboardController.delete);

module.exports = router;
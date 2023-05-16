var express = require('express');
var router = express.Router();
var dashboardController = require('../controllers/Dashboard');

router.get('/', dashboardController.show);

// router.post('/:id?', reservationController.add);
// router.get('/delete/:id', dashboardController.delete);

module.exports = router;
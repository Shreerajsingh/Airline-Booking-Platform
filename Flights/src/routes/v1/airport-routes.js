const express = require('express');
const { AirportController } = require('../../controllers');
const { AirportMiddlewares } = require('../../middlewares');

const router = express.Router();

router.post('/', AirportMiddlewares.createMiddleware, AirportController.createAirport);

router.get('/:id', AirportController.getAirport);

router.get('/', AirportController.getAirports);

router.delete('/:id', AirportController.destroyAirport);

router.patch('/:id', AirportController.updateAirport);

module.exports = router;
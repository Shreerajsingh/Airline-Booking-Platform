const express = require('express');
const { AirplaneController } = require('../../controllers');
const { AirplaneMiddlewares } = require('../../middlewares');

const router = express.Router();

router.post('/', AirplaneMiddlewares.createMiddleware, AirplaneController.createAirplane);

router.get('/:id', AirplaneController.getAirplane);

router.get('/', AirplaneController.getAirplanes);

router.delete('/:id', AirplaneController.destroyAirplane);

router.patch('/:id', AirplaneController.updateAirplane);

module.exports = router;
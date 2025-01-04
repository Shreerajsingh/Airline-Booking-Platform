const express = require('express');
const { CityController } = require('../../controllers');
const { CityMiddlewares } = require('../../middlewares');

const router = express.Router();

router.post('/', CityMiddlewares.createMiddleware, CityController.createCity);

router.patch('/:id', CityController.updateCity);

router.delete('/:id', CityController.deleteCity);

module.exports = router;
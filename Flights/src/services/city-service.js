const { StatusCodes } = require("http-status-codes");
const { CityRepository } = require("../repositories");
const AppError = require("../utils/error/app-error");

const cityRepository = new CityRepository();

async function createCity(data) {
    try {
        const response = await cityRepository.create(data);
        return response;
    } catch (error) {
        if(error.name == "SequelizeUniqueConstraintError" || error.name == "SequelizeValidationError") {
            let explaination = [];

            error.errors.forEach((err) => {
                explaination.push(err.message);
            });

            throw new AppError(explaination, StatusCodes.BAD_REQUEST);
        }
        throw new AppError("Cannot create a new city object", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateCity(id, data) {
    try {
        const response = await cityRepository.update(id, data);

        return response;
    } catch (error) {
        if(error.name == "SequelizeUniqueConstraintError" || error.name == "SequelizeValidationError") {
            let explaination = [];

            error.errors.forEach((err) => {
                explaination.push(err.message);
            });

            throw new AppError(explaination, StatusCodes.BAD_REQUEST);
        }
        throw new AppError("Cannot update a city object", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyCity(id) {
    try {
        const response = await cityRepository.destroy(id);

        return response;
    } catch (error) {
        if(error.name == "SequelizeUniqueConstraintError" || error.name == "SequelizeValidationError") {
            let explaination = [];

            error.errors.forEach((err) => {
                explaination.push(err.message);
            });

            throw new AppError(explaination, StatusCodes.BAD_REQUEST);
        }
        throw new AppError("Cannot delete a city object", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports = {
    createCity,
    updateCity,
    destroyCity
}
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/error/app-error");
const { FlightRepository } = require("../repositories");
const compareTime = require("../utils/helpers/datetime-helper");
const { Op } = require("sequelize");

const flightRepository = new FlightRepository();

async function createFlight(data) {
    try {
        if(!compareTime(data.arrivalTime, data.departureTime)) {
            throw new AppError("Invalid arrival and departure time", StatusCodes.BAD_REQUEST);
        }

        const response = await flightRepository.create(data);

        return response;
    } catch (error) {
        if(error instanceof AppError) {
            throw error;
        }

        if(error.name == "SequelizeValidationError") {
            let explaination = [];

            error.errors.forEach((err) => {
                explaination.push(err.message);
            });

            throw new AppError(explaination, StatusCodes.BAD_REQUEST);
        }
        throw new AppError("Cannot create a new Flight object", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllFlights(query) {
    let customFilter = {};
    let sortFilter = [];
    const endingTripTime = " 23:59:00";

    if(query.trips) {
        [departureAirportId, arrivalAirportId] = query.trips.split("-");

        customFilter.departureAirportId = departureAirportId,
        customFilter.arrivalAirportId = arrivalAirportId
    }

    if(query.price) {
        [minPrice, maxPrice] = query.price.split("-");
        customFilter.price = {
            [Op.between]: [minPrice, maxPrice === undefined ? 100000 : maxPrice]
        }
    }

    if(query.travellers) {
        customFilter.totalSeats = {
            [Op.gte]: query.travellers
        }
    }

    if(query.tripDate) {
        console.log(query.tripDate, query.tripDate + endingTripTime);
        customFilter.departureTime = {
            [Op.between]: [query.tripDate, query.tripDate + endingTripTime]
        }
    }

    if(query.sort) {
        const params = query.sort.split(",");
        const sortFilters = params.map((param) => param.split("_"));
        sortFilter = sortFilters;
    }
     
    try {
        const response = await flightRepository.getAllFlights(customFilter, sortFilter);

        return response;
    } catch (error) {
        console.log(error);
        throw new AppError("Cannot fetch the data of all the flights", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getFlight(id) {
    try {
        const response = await flightRepository.get(id);

        return response;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            return new AppError("The flight you requested is not present", error.statusCode);
        }

        return new AppError("Cannot fetch the data of requested flight", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateRemainingSeats(data) {
    try {
        const response = await flightRepository.updateRemainingSeats(data.flightId, data.seats, data.dec);

        return response;
    } catch (error) {
        console.log(error);
        throw new AppError("Cannot update the data of flight", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createFlight,
    getAllFlights,
    getFlight,
    updateRemainingSeats
}
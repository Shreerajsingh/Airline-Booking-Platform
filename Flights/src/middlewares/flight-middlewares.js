const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/error/app-error");

function validateCreateRequest(req, res, next) {
    if(!req.body.flightNumber) {
        ErrorResponse.message = "Somthing went wrong while creating flight";
        ErrorResponse.error = new AppError(['Flight number not found in the oncoming request'], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json({
            ErrorResponse
        });
    }
    if(!req.body.airplaneId) {
        ErrorResponse.message = "Somthing went wrong while creating airplane";
        ErrorResponse.error = new AppError(['Airplane Id code not found in the oncoming request'], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json({
            ErrorResponse
        });
    }
    if(!req.body.departureAirportId) {
        ErrorResponse.message = "Somthing went wrong while creating flight";
        ErrorResponse.error = new AppError(['Departure Airport Id not found in the oncoming request'], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json({
            ErrorResponse
        });
    }
    if(!req.body.arrivalAirportId) {
        ErrorResponse.message = "Somthing went wrong while creating flight";
        ErrorResponse.error = new AppError(['Arrival Airport Id not found in the oncoming request'], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json({
            ErrorResponse
        });
    }
    if(!req.body.arrivalTime) {
        ErrorResponse.message = "Somthing went wrong while creating flight";
        ErrorResponse.error = new AppError(['Arrival time not found in the oncoming request'], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json({
            ErrorResponse
        });
    }
    if(!req.body.departureTime) {
        ErrorResponse.message = "Somthing went wrong while creating flight";
        ErrorResponse.error = new AppError(['Departure time not found in the oncoming request'], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json({
            ErrorResponse
        });
    }
    if(!req.body.price) {
        ErrorResponse.message = "Somthing went wrong while creating flight";
        ErrorResponse.error = new AppError(['Price not found in the oncoming request'], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json({
            ErrorResponse
        });
    }
    if(!req.body.totalSeats) {
        ErrorResponse.message = "Somthing went wrong while creating flight";
        ErrorResponse.error = new AppError(['Total seats not found in the oncoming request'], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json({
            ErrorResponse
        });
    }
    next();
}

function validateUpdateSeatRequest(req, res, next) {
    if(!req.body.seats) {
        ErrorResponse.message = "Somthing went wrong while updating flight";
        ErrorResponse.error = new AppError(['seats not found in the oncoming request'], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json({
            ErrorResponse
        });
    }
    next();
}

module.exports = {
    validateCreateRequest,
    validateUpdateSeatRequest
}
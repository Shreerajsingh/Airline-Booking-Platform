const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/error/app-error");

function createMiddleware(req, res, next) {
    if(!req.body.name) {
        ErrorResponse.message = "Somthing went wrong while creating airport";
        ErrorResponse.error = new AppError(['Name not found in the oncoming request'], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json({
            ErrorResponse
        });
    }
    if(!req.body.code) {
        ErrorResponse.message = "Somthing went wrong while creating airport";
        ErrorResponse.error = new AppError(['Airport code not found in the oncoming request'], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json({
            ErrorResponse
        });
    }
    if(!req.body.cityId) {
        ErrorResponse.message = "Somthing went wrong while creating airport";
        ErrorResponse.error = new AppError(['City Id not found in the oncoming request'], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json({
            ErrorResponse
        });
    }
    next();
}

module.exports = {
    createMiddleware
}
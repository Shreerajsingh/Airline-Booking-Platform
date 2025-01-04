const CrudRepository = require("./crud-repository");
const {Flight, Airplane, Airport, City, sequelize} = require('../models');
const { Sequelize } = require("sequelize");
const { addRowLockOnFlight } = require('./queries');

class FLightRepository extends CrudRepository {
    constructor() {
        super(Flight);
    }

    async getAllFlights(filters, sort) {
        const response = await Flight.findAll({
            where: filters,
            order: sort,
            include: [
                {
                    model: Airplane,
                    required: true,
                    as: 'airplaneDetail'
                },
                {
                    model: Airport,
                    required: true,
                    as: 'departureAirport',
                    on: {
                        col1: Sequelize.where(Sequelize.col("Flight.departureAirportId"), "=", Sequelize.col("departureAirport.code"))
                    }
                },
                {
                    model: Airport,
                    required: true,
                    as: 'arrivalAirport',
                    on: {
                        col1: Sequelize.where(Sequelize.col("Flight.arrivalAirportId"), "=", Sequelize.col("arrivalAirport.code"))
                    },
                    include: {
                        model: City,
                        required: true
                    }
                }
            ]
        })

        return response;
    }

    async updateRemainingSeats(flightId, seats, dec = true) {
        const transaction = await sequelize.transaction();
        try {
            await sequelize.query(addRowLockOnFlight(flightId));
            const flight = await Flight.findByPk(flightId);

            if(+dec) {
                await flight.decrement('totalSeats', {by: seats}, {transaction: transaction});
            } else {
                await flight.increment('totalSeats', {by: seats}, {transaction: transaction});
            }

            await transaction.commit();
            return flight;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}

module.exports = FLightRepository;
const CrudRepository = require('./crud-repository');
const { Ticket } = require('../models');
const { TICKET_STATUS } = require('../utils/common/enums');

class TicketRespository extends CrudRepository {
    constructor() {
        super(Ticket);
    }

    async getPendingTickets() {
        const response = await Ticket.findAll({
            where: {
                status: TICKET_STATUS.PENDING
            }
        })

        return response;
    }
}

module.exports = TicketRespository;
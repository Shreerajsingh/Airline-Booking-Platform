const { TicketRespository } = require("../repositories");
const { Mailer } = require("../config");

const ticketRepository = new TicketRespository();

async function sendMail(mailFrom, mailTo, subject, text) {
    try {
        const response = await Mailer.sendMail({
            form: mailFrom,
            to: mailTo,
            subject: subject,
            text: text
        })

        return response;
    }
    catch (error) {
        throw error;
    }
}

async function createTicket(data) {
    try {
        const response = await ticketRepository.create(data);
        return response;
    } catch (error) {
        throw error;
    }
}

async function getPendingEmails() {
    try {
        const response = await ticketRepository.getPendingTickets();
        return response;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    sendMail,
    createTicket,
    getPendingEmails
}
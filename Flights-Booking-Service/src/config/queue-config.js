const amqplib = require('amqplib');

let connection, channel, queueName;

async function createQueue(name) {
    try {
        queueName = name;

        connection = await amqplib.connect("amqp://localhost");
        channel = await connection.createChannel();

        await channel.assertQueue(queueName);
    } catch (error) {
        throw error;
    }
}

async function sendData(data) {
    try {
        channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createQueue,
    sendData
}
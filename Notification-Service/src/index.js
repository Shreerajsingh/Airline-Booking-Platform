const express = require('express');
const amqplib = require('amqplib');

async function connectQueue() {
    try {
        const connection = await amqplib.connect("amqp://localhost");

        const channel = await connection.createChannel();

        await channel.assertQueue("Notification-Queue");

        // await channel.sendToQueue("Notification-Queue", Buffer.from("Hello world yoooo!"));
        await channel.consume("Notification-Queue", async (data) => {
            const newData = JSON.parse(Buffer.from(data.content));

            console.log(newData);
            
            const response = await EmailService.sendMail(ServerConfig.GMAIL_ADDR, newData.recepientEmail, newData.subject, newData.content);

            console.log(response);
            
            channel.ack(data);
        })

        //setInterval(async() => {}, 1000);
    } catch (error) {
        console.log(error);
    }
}

const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');
const { EmailService } = require('./services');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:  true}));

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, async() => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);

    connectQueue();
    console.log("Queue connected");
});

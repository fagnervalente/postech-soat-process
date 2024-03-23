import amqp from 'amqplib';
import IOrderQueueIN from "@ports/IOrderQueueIN";
import OrderQueueController from "@controllers/OrderQueueController";
import OrderQueueDatabaseRepository from '../database/repository/OrderQueueDatabaseRepository';

const orderQueueDatabaseRepository = new OrderQueueDatabaseRepository()

export default class OrderQueueIN implements IOrderQueueIN {
    async listen(channel: amqp.Channel): Promise<void> {
        channel.consume(process.env.CONFIRMED_PAYMENT_QUEUE_NAME as string, receivePaymentConfirmed, { noAck: true });
    }
}

async function receivePaymentConfirmed(msg: amqp.ConsumeMessage | null) {
    if (msg !== null) {
        try {
            const { orderId } = JSON.parse(msg.content.toString());
            OrderQueueController.addToQueue(orderId, orderQueueDatabaseRepository);
        } catch (e) {
            console.error(e);
        }
    } else {
        console.error('Consumer cancelled by server');
    }
}
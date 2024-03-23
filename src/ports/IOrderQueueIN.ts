import amqp from 'amqplib';
export default interface IOrderQueueIN {
    listen(channel: amqp.Channel): void;
}
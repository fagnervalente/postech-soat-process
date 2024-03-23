import 'dotenv/config';
import IOrderQueueOUT from "@ports/IOrderQueueOUT";
import Messaging from "./messaging";

export default class PaymentQueueOUT implements IOrderQueueOUT {
    publishStatus(message: Object): boolean {
        return Messaging.getChannel().sendToQueue(process.env.STATUS_ORDER_QUEUE_NAME as string, Buffer.from(JSON.stringify(message)));
    }
}
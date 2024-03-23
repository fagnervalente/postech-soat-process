export default interface IOrderQueueOUT {
    publishStatus(message: Object): boolean;
}
import { AppDataSource } from "../data-source";
import IOrderQueueRepository from "@ports/IOrderQueueRepository";
import { OrderQueueModel } from "@database/models/OrderQueueModel";
import { OrderQueue } from "@entities/OrderQueue";

export default class OrderQueueDatabaseRepository implements IOrderQueueRepository {

  orderQueueRepository = AppDataSource.getRepository(OrderQueueModel);

  async save(order: OrderQueue): Promise<OrderQueue> {
    const newOrder = this.orderQueueRepository.create(order);
    return await this.orderQueueRepository.save(newOrder);
  }

  list(): Promise<OrderQueue[]> {
    return this.orderQueueRepository.find({
      order: {
        status: "DESC",
        id: "DESC",
      },
    });
  }

  async update(order: OrderQueue): Promise<void> {
    const orderId = Number(order.orderId);
    await this.orderQueueRepository.update({ orderId: orderId }, order);
    return;
  }

  async findById(id: number): Promise<OrderQueue | null> {
    return await this.orderQueueRepository.findOneBy({ orderId: id });
  }

}
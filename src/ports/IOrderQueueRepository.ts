import { OrderQueue } from "@entities/OrderQueue";

export default interface IOrderQueueRepository {
  save(order: OrderQueue): Promise<OrderQueue | null>;
  list(): Promise<OrderQueue[]>;
  update(order: OrderQueue): Promise<void>;
  findById(id: string): Promise<OrderQueue | null>
}
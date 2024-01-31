import OrderQueueRepository from "../../../src/ports/IOrderQueueRepository";
import { OrderQueueModel as Order } from "../../../src/adapter/database/models/OrderQueueModel";

export default class OrderQueueInMemoryRepository implements OrderQueueRepository {

	public orders: Order[] = [];

	public async save(order: Order): Promise<Order> {
		const created = {
			...order,
			id: order.id ? order.id : Math.floor(Math.random() * Date.now()).toString()
		};
		this.orders.push(created);

		return created;
	}

	public async list(): Promise<Order[]> {
		return [...this.orders];
	}

	public async update(order: Order): Promise<void> {
		this.orders.map((c) => {
			if (c.id == order.id) {
				c.orderId = order.orderId;
				c.status = order.status;
			}
		});
	}


	public async findById(id: string): Promise<Order | null> {
		const found = this.orders.find((order) => order.id == id) ?? null;
		return found;
	}
}
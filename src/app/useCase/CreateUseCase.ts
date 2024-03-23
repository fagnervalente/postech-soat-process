import { OrderQueue, OrderStatus } from "@entities/OrderQueue";
import IOrderQueueRepository from "@ports/IOrderQueueRepository";
import AbstractUseCase from "./AbstractUseCase";

export default class CreateUseCase extends AbstractUseCase {

	constructor(readonly repository: IOrderQueueRepository) {
		super(repository);
	}

	public async execute(orderQueue: OrderQueue): Promise<OrderQueue | null> {
		if (!orderQueue.orderId) {
			this.setError({ message: "Order id required!" });
		}

		if (this.hasErrors()) {
			return null;
		}

		orderQueue.status = OrderStatus.RECEBIDO;

		return await this.repository.save(orderQueue);
	}
}
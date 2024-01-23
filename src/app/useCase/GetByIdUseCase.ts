import IOrderQueueRepository from "@ports/IOrderQueueRepository";
import AbstractUseCase from "./AbstractUseCase";
import { OrderQueue } from "@entities/OrderQueue";

export default class GetByIdUseCase extends AbstractUseCase {

	constructor(readonly orderRepository: IOrderQueueRepository) {
		super(orderRepository);
	}

	async execute(orderId: number): Promise<OrderQueue | null> {
		const order = await this.orderRepository.findById(orderId);
		if (!order) this.setError({ message: "Order not found" });

		return { orderId: order?.orderId, status: order?.status };
	}
}
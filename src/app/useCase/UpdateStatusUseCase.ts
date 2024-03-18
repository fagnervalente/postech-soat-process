import { OrderQueue, OrderStatus } from "@entities/OrderQueue";
import IOrderQueueRepository from "@ports/IOrderQueueRepository";
import AbstractUseCase from "./AbstractUseCase";
import IOrderQueueOUT from "@ports/IOrderQueueOUT";

export default class UpdateStatusUseCase extends AbstractUseCase {

	constructor(readonly orderRepository: IOrderQueueRepository, readonly orderQueueOUT: IOrderQueueOUT) {
		super(orderRepository);
	}

	async execute(orderId: string, status: OrderStatus): Promise<OrderQueue | null> {
		await this.validateOrder(orderId);
		await this.validateStatus(status);

		if (this.hasErrors()) {
			return null;
		}

		const order = await this.orderRepository.findById(orderId);
		order!.status = status!;

		const updatedOrder = await this.orderRepository.save(order!);

		if (updatedOrder != null) {
			this.orderQueueOUT.publishStatus({ orderId, status });
		}

		return Promise.resolve(updatedOrder);
	}

	private async validateOrder(id: string) {
		const found = await this.orderRepository.findById(id);
		if (!found) this.setError({ message: "Order not found" });
	}

	private async validateStatus(status: OrderStatus | null) {
		if (status === null) this.setError({ message: "Invalid order status" });
	}
}
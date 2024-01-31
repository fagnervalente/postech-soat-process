import { OrderQueue, OrderStatus } from "@entities/OrderQueue";
import IOrderQueueRepository from "@ports/IOrderQueueRepository";
import AbstractUseCase from "./AbstractUseCase";

export default class UpdateStatusUseCase extends AbstractUseCase {

	constructor(readonly orderRepository: IOrderQueueRepository) {
		super(orderRepository);
	}

	async execute(orderId: string, status: OrderStatus): Promise<OrderQueue | null> {
		this.validateOrder(orderId);
		this.validateStatus(status);

		if (this.hasErrors()) {
			return null;
		}

		const order = await this.orderRepository.findById(orderId);
		order!.status = status!;

		return await this.orderRepository.save(order!);
	}

	private async validateOrder(id: string) {
		const found = await this.orderRepository.findById(id);
		if (!found) this.setError({ message: "Order not found" });
	}

	private async validateStatus(status: OrderStatus | null) {
		if (status === null) this.setError({ message: "Invalid order status" });
	}
}
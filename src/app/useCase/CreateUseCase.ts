import { OrderQueue, OrderStatus } from "@entities/OrderQueue";
import IOrderQueueRepository from "@ports/IOrderQueueRepository";
import AbstractUseCase from "./AbstractUseCase";

export default class CreateUseCase extends AbstractUseCase {

	constructor(readonly repository: IOrderQueueRepository) {
		super(repository);
	}

	public async execute(orderQueue: OrderQueue): Promise<OrderQueue | null> {
		const orderId = await this.getParsedOrderId(orderQueue);

		if (this.hasErrors()) {
			return null;
		}

		orderQueue.orderId = orderId;
		orderQueue.status = OrderStatus.RECEBIDO;

		return await this.repository.save(orderQueue);
	}

	private async getParsedOrderId(order: OrderQueue): Promise<number | undefined> {
		if (!order.orderId && order.orderId === 0) {
			// Usar GET de Order para verificar se o pedido existe, se sim, retornar o id informado como referência
		}

		return undefined;
	}
}
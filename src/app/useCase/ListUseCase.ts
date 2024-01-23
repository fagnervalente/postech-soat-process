import { OrderQueue } from "@entities/OrderQueue";
import IOrderQueueRepository from "@ports/IOrderQueueRepository";
import AbstractUseCase from "./AbstractUseCase";

export default class ListUseCase extends AbstractUseCase {

	constructor(readonly orderRepository: IOrderQueueRepository) {
		super(orderRepository);
	}

	async execute(): Promise<OrderQueue[] | null> {
		return await this.orderRepository.list();
	}
}
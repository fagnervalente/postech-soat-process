import { OrderQueue, OrderStatus } from "@entities/OrderQueue";
import CreateUseCase from "@useCases/CreateUseCase";
import IOrderQueueRepository from "../ports/IOrderQueueRepository";
import GetByIdUseCase from "@useCases/GetByIdUseCase";
import ListUseCase from "@useCases/ListUseCase";
import UpdateStatusUseCase from "@useCases/UpdateStatusUseCase";

export default class OrderController {
	static async checkout(products: Array<number>, cpf: string, orderRepository: IOrderQueueRepository) {
		const createUseCase = new CreateUseCase(orderRepository);
		const result = await createUseCase.execute({ products, customerId: cpf } as OrderQueue);

		if (createUseCase.hasErrors()) throw createUseCase.getErrors();

		return { Pedido: result?.id };
	}

	static async list(orderRepository: IOrderQueueRepository) {
		const listOrder = new ListUseCase(orderRepository);
		const result = await listOrder.execute();

		if (listOrder.hasErrors()) throw listOrder.getErrors();

		return result;
	}

	static async getById(orderId: number, orderRepository: IOrderQueueRepository) {
		const getPaymentStatus = new GetByIdUseCase(orderRepository);
		const result = await getPaymentStatus.execute(orderId);

		if (getPaymentStatus.hasErrors()) throw getPaymentStatus.getErrors();

		return result;
	}

	static async updateStatus(orderId: number, orderStatus: OrderStatus, orderRepository: IOrderQueueRepository) {
		const updateStatusUseCase = new UpdateStatusUseCase(orderRepository);

		await updateStatusUseCase.execute(orderId, orderStatus);

		if (updateStatusUseCase.hasErrors()) {
			throw updateStatusUseCase.getErrors();
		}
	}
}
import { OrderQueue, OrderStatus } from "@entities/OrderQueue";
import IOrderQueueRepository from "@ports/IOrderQueueRepository";
import AbstractUseCase from "./AbstractUseCase";
import got from "got";
import { OrderPaymentStatus } from "@database/models/OrderQueueModel";

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

		if (orderQueue.paymentStatus === OrderPaymentStatus.RECUSADO) {
			orderQueue.status = OrderStatus.FINALIZADO;
		} else {
			orderQueue.status = OrderStatus.RECEBIDO;
		}

		const orderEndpoint = process.env.ORDER_SERVICE_ENDPOINT as string;
		await got.put(`${orderEndpoint}/paymentStatus/${orderId}`, { json: { status: orderQueue.paymentStatus } });

		return await this.repository.save(orderQueue);
	}

	private async getParsedOrderId(order: OrderQueue): Promise<string | undefined> {
		if (!order.orderId && order.orderId === "") {
			const orderEndpoint = process.env.ORDER_SERVICE_ENDPOINT as string;
			const response = await got.get(`${orderEndpoint}/payment/${order.orderId}`);
			if (response.statusCode != 200) {
				this.setError(JSON.parse(response.body))
			}
		} else {
			this.setError({ message: "Order id required!" })
		}

		return order.orderId;
	}
}
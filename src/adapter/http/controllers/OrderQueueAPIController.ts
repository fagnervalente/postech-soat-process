import { Request, Response } from "express";
import OrderQueueDatabaseRepository from "@database/repository/OrderQueueDatabaseRepository";
import OrderQueueController from "@controllers/OrderQueueController";
import { OrderStatus } from "@entities/OrderQueue";

const orderRepository = new OrderQueueDatabaseRepository();

export default class OrderQueueAPIController {
	async addToQueue(req: Request, res: Response) {
		OrderQueueController.addToQueue(req.params.id, orderRepository)
			.then((result: any) => {
				return res.status(201).json(result);
			})
			.catch((errors: any) => {
				return res.status(400).json(errors);
			});
	}

	async list(req: Request, res: Response) {
		OrderQueueController.list(orderRepository)
			.then((result: any) => {
				return res.status(200).json(result);
			})
			.catch((errors: any) => {
				return res.status(400).json(errors);
			});
	}

	async getById(req: Request, res: Response) {
		const orderId = req.params.id;

		OrderQueueController.getById(orderId, orderRepository)
			.then((result: any) => {
				return res.status(200).json(result);
			})
			.catch((errors: any) => {
				return res.status(400).json(errors);
			});
	}

	async updateStatus(req: Request, res: Response) {
		const orderId = req.params.id;
		const orderStatus = req.body.status as OrderStatus;

		OrderQueueController.updateStatus(orderId, orderStatus, orderRepository)
			.then((result: any) => {
				return res.status(200).json(result);
			})
			.catch((errors: any) => {
				return res.status(400).json(errors);
			});
	}
}
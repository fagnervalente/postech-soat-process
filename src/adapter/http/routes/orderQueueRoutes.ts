import { Router } from "express";
import HttpUtils from "../HttpUtils";
import OrderQueueAPIController from "../controllers/OrderQueueAPIController";

const orderQueueRoutes = HttpUtils.asyncRouterHandler(Router());

orderQueueRoutes.get('/orderQueue', new OrderQueueAPIController().list);
orderQueueRoutes.post('/orderQueue/add/:id', new OrderQueueAPIController().addToQueue);
orderQueueRoutes.get('/orderQueue/order/:id', new OrderQueueAPIController().getById);
orderQueueRoutes.put('/orderQueue/status/:id', new OrderQueueAPIController().updateStatus);

export default orderQueueRoutes;
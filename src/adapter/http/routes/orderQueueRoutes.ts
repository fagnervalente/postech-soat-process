import { Router } from "express";
import HttpUtils from "../HttpUtils";
import OrderAPIController from "../controllers/OrderAPIController";

const orderQueueRoutes = HttpUtils.asyncRouterHandler(Router());

orderQueueRoutes.get('/order', new OrderAPIController().list);
orderQueueRoutes.post('/order/checkout', new OrderAPIController().checkout);
orderQueueRoutes.get('/order/payment/:id', new OrderAPIController().getById);
orderQueueRoutes.put('/order/status/:id', new OrderAPIController().updateStatus);

export default orderQueueRoutes;
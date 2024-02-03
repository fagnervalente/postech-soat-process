import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import OrderQueueController from '../../src/controllers/OrderQueueController';
import { OrderQueue, OrderStatus } from '../../src/domain/entities/OrderQueue';
import IOrderQueueRepository from '../../src/ports/IOrderQueueRepository';
import got from 'got';
vi.mock('got');

const mockOrderQueue1 = {
    orderId: 'order1',
    status: OrderStatus.RECEBIDO
} as OrderQueue;

const mockOrderQueue2 = {
    orderId: 'order2',
    status: OrderStatus.RECEBIDO
} as OrderQueue;

let counter = 1;

class MockOrderQueueRepository implements IOrderQueueRepository {
    readonly mockOrders = {'order1': mockOrderQueue1, 'order2': mockOrderQueue2}

    save(order: OrderQueue): Promise<OrderQueue | null> {
        this.mockOrders[order.orderId as string] = order = {...order, id: 'id' + counter++};
        return Promise.resolve(order);
    }
    list(): Promise<OrderQueue[]> {
        return Promise.resolve([]);
    }
    update(order: OrderQueue): Promise<void> {
        this.save(order);
        return Promise.resolve();
    }
    findById(id: string): Promise<OrderQueue | null> {
        if(this.mockOrders[id]){
            return Promise.resolve(this.mockOrders[id] as OrderQueue);
        } else{
            return Promise.resolve(null);
        }
    }
}

describe("OrderQueueController", () => {

    let orderQueueController: OrderQueueController;
    const mockOrderQueueRepository = new MockOrderQueueRepository();

    const orderId = "order1";
    const orderStatus = OrderStatus.EM_PREPARACAO;

    beforeEach(() => {
        (got.get as Mock).mockImplementation( async () => ({statusCode : 200}) );
        (got.put as Mock).mockImplementation( async () => ({statusCode : 200}) );
        (got.post as Mock).mockImplementation( async () => ({statusCode : 201}) );
    });

    describe("addToQueue", () => {
        it("Should add order to the queue", async () => {
            const mockNewOrderId = 'order3';
            const result = await OrderQueueController.addToQueue(mockNewOrderId, mockOrderQueueRepository);
            expect((result as any).Pedido).toBeDefined();
        });

        it("Should throw an error for an invalid order ID", async () => {
            await expect(() => OrderQueueController.addToQueue('', mockOrderQueueRepository)).rejects.toThrowError();
        });
    });

    describe("list", () => {
        it("Should return an empty array", async () => {
            const result = await OrderQueueController.list(mockOrderQueueRepository);
            expect(result).toEqual([]);
        });
    });

    describe("getById", () => {
        it("Should throw error non-existing order", async () => {
            await expect(() => OrderQueueController.getById('nonExistingId', mockOrderQueueRepository)).rejects.toThrowError();
        });

        it("Should throw an error for an invalid order ID", async () => {
            await expect(() => OrderQueueController.getById('', mockOrderQueueRepository)).rejects.toThrowError();
        });
    });

    describe("updateStatus", () => {
        it("Should update order status", async () => {
            await expect(() => OrderQueueController.updateStatus(orderId, orderStatus, mockOrderQueueRepository)).not.toThrowError();
        });

        it("Should throw an error for an invalid order ID", async () => {
            await expect(() => OrderQueueController.updateStatus('', orderStatus, mockOrderQueueRepository)).rejects.toThrowError();
        });

        it("Should throw an error for an invalid order status", async () => {
            await expect(() => OrderQueueController.updateStatus(orderId, null, mockOrderQueueRepository)).rejects.toThrowError();
        });
    });
});

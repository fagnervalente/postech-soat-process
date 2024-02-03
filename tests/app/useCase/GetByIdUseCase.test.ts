import { beforeEach, describe, test, expect, vi, it } from 'vitest';
import GetByIdUseCase from '../../../src/app/useCase/GetByIdUseCase';
import IOrderQueueRepository from '../../../src/ports/IOrderQueueRepository';
import { OrderPaymentStatus, OrderQueue, OrderStatus } from '../../../src/domain/entities/OrderQueue';

const mockOrderQueue = {
    orderId: 'validOrderId',
    status: OrderStatus.RECEBIDO
} as OrderQueue;

class MockOrderQueueRepository implements IOrderQueueRepository {
    readonly mockOrders = {'validOrderId': mockOrderQueue}

    save(order: OrderQueue): Promise<OrderQueue | null> {
        return Promise.resolve(order);
    }
    list(): Promise<OrderQueue[]> {
        return Promise.resolve([]);
    }
    update(order: OrderQueue): Promise<void> {
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

describe('GetByIdUseCase', () => {
    let mockedOrderQueueRepository = new MockOrderQueueRepository();
    let getByIdUseCase: GetByIdUseCase;

    beforeEach(() => {
        getByIdUseCase = new GetByIdUseCase(mockedOrderQueueRepository);
    });

    it('On create get the repository', () => {
        expect(getByIdUseCase.repository).equal(mockedOrderQueueRepository);
    });

    it('Return order details for a valid order ID', async () => {
        // Arrange
        const orderId = 'validOrderId';

        // Act
        const result = await getByIdUseCase.execute(orderId);

        // Assert
        expect(result).toMatchObject(mockOrderQueue);
    });

    it('Return error message for an invalid order ID', async () => {
        // Arrange
        const invalidOrderId = 'invalidOrderId';

        // Act
        const result = await getByIdUseCase.execute(invalidOrderId);

        // Assert
        expect(result).toBeNull();
        expect(getByIdUseCase.hasErrors()).toBeTruthy();
    });
});

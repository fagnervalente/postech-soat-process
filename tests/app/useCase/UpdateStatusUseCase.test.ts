import { beforeEach, describe, test, expect, vi, it } from 'vitest';
import UpdateStatusUseCase from '../../../src/app/useCase/UpdateStatusUseCase';
import IOrderQueueRepository from '../../../src/ports/IOrderQueueRepository';
import { OrderQueue, OrderStatus } from '../../../src/domain/entities/OrderQueue';

const mockOrderQueue1 = {
    orderId: 'order1',
    status: OrderStatus.RECEBIDO
} as OrderQueue;

const mockOrderQueue2 = {
    orderId: 'order2',
    status: OrderStatus.RECEBIDO
} as OrderQueue;

class MockOrderQueueRepository implements IOrderQueueRepository {
    readonly mockOrders = {'order1': mockOrderQueue1, 'order2': mockOrderQueue2}

    save(order: OrderQueue): Promise<OrderQueue | null> {
        this.mockOrders[order.id as string] = order;
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

describe('UpdateStatusUseCase', () => {
    let mockedOrderQueueRepository = new MockOrderQueueRepository();
    let updateStatusUseCase: UpdateStatusUseCase;

    beforeEach(() => {
        updateStatusUseCase = new UpdateStatusUseCase(mockedOrderQueueRepository);
    });

    it('On create get the repository', () => {
        expect(updateStatusUseCase.repository).equal(mockedOrderQueueRepository);
    });

    it('Update order status successfully', async () => {
        // Arrange
        const orderId = mockOrderQueue1.orderId as string;
        const newStatus = OrderStatus.EM_PREPARACAO;

        const saveSpy = vi.spyOn(mockedOrderQueueRepository, 'save');

        // Act
        const result = await updateStatusUseCase.execute(orderId, newStatus);

        // Assert
        expect(saveSpy).toHaveBeenCalledOnce();
        expect(result).toMatchObject({
            ...mockOrderQueue1,
            status: newStatus
        });
    });

    it('Return error for invalid order ID', async () => {
        // Arrange
        const invalidOrderId = '';
        const newStatus = OrderStatus.EM_PREPARACAO;

        // Act
        const result = await updateStatusUseCase.execute(invalidOrderId, newStatus);

        // Assert
        expect(result).toBeNull();
        expect(updateStatusUseCase.hasErrors()).toBeTruthy();
    });

    it('Return error for invalid order status', async () => {
        // Arrange
        const orderId = 'orderId1';
        const invalidStatus = null;

        // Act
        const result = await updateStatusUseCase.execute(orderId, invalidStatus);

        // Assert
        expect(result).toBeNull();
        expect(updateStatusUseCase.hasErrors()).toBeTruthy();
    });
});

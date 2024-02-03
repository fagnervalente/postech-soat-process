import { beforeEach, describe, test, expect, vi, it } from 'vitest';
import ListUseCase from '../../../src/app/useCase/ListUseCase';
import IOrderQueueRepository from '../../../src/ports/IOrderQueueRepository';
import { OrderQueue, OrderStatus } from '../../../src/domain/entities/OrderQueue';

class MockOrderQueueRepository implements IOrderQueueRepository {
    save(order: OrderQueue): Promise<OrderQueue | null> {
        return Promise.resolve(order);
    }
    list(): Promise<OrderQueue[]> {
        const mockOrderList: OrderQueue[] = [
            {
                orderId: 'orderId1',
                status: OrderStatus.EM_PREPARACAO
            },
            {
                orderId: 'orderId2',
                status: OrderStatus.RECEBIDO
            },
        ];
        return Promise.resolve(mockOrderList);
    }
    update(order: OrderQueue): Promise<void> {
        return Promise.resolve();
    }
    findById(id: string): Promise<OrderQueue | null> {
        return Promise.resolve(null);
    }
}

describe('ListUseCase', () => {
    let mockedOrderQueueRepository = new MockOrderQueueRepository();
    let listUseCase: ListUseCase;

    beforeEach(() => {
        listUseCase = new ListUseCase(mockedOrderQueueRepository);
    });

    it('On create get the repository', () => {
        expect(listUseCase.repository).equal(mockedOrderQueueRepository);
    });

    it('Return a list of orders', async () => {
        // Act
        const result = await listUseCase.execute();

        // Assert
        expect(result).toBeInstanceOf(Array);
        expect((result as any).length).toBeGreaterThan(0);
    });
});

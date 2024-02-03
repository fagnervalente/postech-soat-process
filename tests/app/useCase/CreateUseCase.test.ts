import { beforeEach, describe, test, expect, vi, it, Mock } from 'vitest';
import CreateUseCase from '../../../src/app/useCase/CreateUseCase';
import IOrderQueueRepository from '../../../src/ports/IOrderQueueRepository';
import { OrderQueue, OrderStatus, OrderPaymentStatus } from '../../../src/domain/entities/OrderQueue';
import got from 'got';
vi.mock('got');

class MockOrderQueueRepository implements IOrderQueueRepository {
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
        return Promise.resolve(null);
    }
}

describe('CreateUseCase', () => {
    let mockedOrderQueueRepository = new MockOrderQueueRepository();
    let createUseCase: CreateUseCase;

    beforeEach(() => {
        createUseCase = new CreateUseCase(mockedOrderQueueRepository);
    });

    it('On create get the repository', () => {
        expect(createUseCase.repository).equal(mockedOrderQueueRepository);
    });

    it('Properly save with valid OrderQueue object', async () => {
        //Arrange
        const mockOrderId = '123';
        const mockOrderQueue:OrderQueue = {orderId: mockOrderId};
        
        const getParsedOrderIdSpy = vi.spyOn(createUseCase as any, 'getParsedOrderId');
        const saveSpy = vi.spyOn(mockedOrderQueueRepository, 'save');

        (got.get as Mock).mockImplementation( async () => ({statusCode : 200}) );
        (got.put as Mock).mockImplementation( async () => ({statusCode : 200}) );
      
        // Act
        const createdOrderQueue = await createUseCase.execute(mockOrderQueue);

        // Assert
        expect(getParsedOrderIdSpy).toHaveBeenCalledOnce();
        expect(saveSpy).toHaveBeenCalledOnce();
        expect(createdOrderQueue).toMatchObject(mockOrderQueue);
    });

    it(`Set order status to 'FINALIZADO' if payment status is 'RECUSADO'`, async () => {
        //Arrange
        const mockOrderId = '123';
        const mockOrderQueue:OrderQueue = {orderId: mockOrderId, paymentStatus: OrderPaymentStatus.RECUSADO};
        
        const getParsedOrderIdSpy = vi.spyOn(createUseCase as any, 'getParsedOrderId');
        const saveSpy = vi.spyOn(mockedOrderQueueRepository, 'save');

        (got.get as Mock).mockImplementation( async () => ({statusCode : 200}) );
      
        // Act
        const createdOrderQueue = await createUseCase.execute(mockOrderQueue);

        // Assert
        expect(getParsedOrderIdSpy).toHaveBeenCalledOnce();
        expect(saveSpy).toHaveBeenCalledOnce();
        expect(createdOrderQueue.status).toEqual(OrderStatus.FINALIZADO);
    });

    it(`Do not save if there's an error parsing orderId`, async () => {
        //Arrange
        const mockOrderId = '123';
        const mockOrderQueue:OrderQueue = {orderId: mockOrderId};
        
        const getParsedOrderIdSpy = vi.spyOn(createUseCase as any, 'getParsedOrderId');
        const saveSpy = vi.spyOn(mockedOrderQueueRepository, 'save');

        (got.get as Mock).mockImplementation( async () => ({statusCode : 500, body:"{}"}) );
      
        // Act
        const createdOrderQueue = await createUseCase.execute(mockOrderQueue);

        // Assert
        expect(getParsedOrderIdSpy).toHaveBeenCalledOnce();
        expect(saveSpy).not.toHaveBeenCalled();
        expect(createdOrderQueue).toBeNull();
    });

    it(`Do not save without orderId`, async () => {
        //Arrange
        const mockOrderId = '';
        const mockOrderQueue:OrderQueue = {orderId: mockOrderId};
        
        const getParsedOrderIdSpy = vi.spyOn(createUseCase as any, 'getParsedOrderId');
        const saveSpy = vi.spyOn(mockedOrderQueueRepository, 'save');

        (got.get as Mock).mockImplementation( async () => ({statusCode : 200}) );
      
        // Act
        const createdOrderQueue = await createUseCase.execute(mockOrderQueue);

        // Assert
        expect(getParsedOrderIdSpy).toHaveBeenCalledOnce();
        expect(saveSpy).not.toHaveBeenCalled();
        expect(createdOrderQueue).toBeNull();
    });

});

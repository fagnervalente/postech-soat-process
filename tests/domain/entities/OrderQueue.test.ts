import { test, expect } from 'vitest';
import { OrderQueue, OrderStatus, OrderPaymentStatus } from '../../../src/domain/entities/OrderQueue';

test("Creating OrderQueue entity", () => {
    // Arrange
    const orderId = 'order123';
    const paymentStatus = OrderPaymentStatus.AGUARDANDO;

    // Act
    const createdOrderQueue = new OrderQueue();
    createdOrderQueue.id = '1';
    createdOrderQueue.status = OrderStatus.RECEBIDO;
    createdOrderQueue.orderId = orderId;
    createdOrderQueue.paymentStatus = paymentStatus;

    // Assert
    expect(createdOrderQueue.id).equals('1');
    expect(createdOrderQueue.status).equals(OrderStatus.RECEBIDO);
    expect(createdOrderQueue.orderId).equals(orderId);
    expect(createdOrderQueue.paymentStatus).equals(paymentStatus);
});

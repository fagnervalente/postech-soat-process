import { Given, Then } from '@cucumber/cucumber';
import assert from 'assert';

import ListUseCase from '../../../src/app/useCase/ListUseCase';
import OrderQueueInMemoryRepository from '../../utils/repositoryInMemory/OrderQueueInMemoryRepository';

const orderRepository = new OrderQueueInMemoryRepository();

Given('inicio a listagem da fila sem pedidos na fila', async function () {
  this.result = await new ListUseCase(orderRepository).execute();
});

Then('deve retornar {int} itens', function (int) {
  return assert.equal(this.result.length, int);
});
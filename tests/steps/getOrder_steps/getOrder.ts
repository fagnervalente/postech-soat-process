import { Given, Then } from "@cucumber/cucumber";
import GetByIdUseCase from "../../../src/app/useCase/GetByIdUseCase";
import OrderQueueInMemoryRepository from '../../utils/repositoryInMemory/OrderQueueInMemoryRepository';
import assert from "assert";

const orderQueueRepository = new OrderQueueInMemoryRepository();
let getByIdUseCase = new GetByIdUseCase(orderQueueRepository);

Given('inicio a obtenção do pedido da fila passando o id {string} como parametro', async function (string) {
  getByIdUseCase = new GetByIdUseCase(orderQueueRepository);
  this.result = [await getByIdUseCase.execute(string)];
});

Then('o resultado deve ser de sucesso', function () {
  return assert.deepStrictEqual(getByIdUseCase.hasErrors(), false);
});

Then('deve retornar {int} item', function (int) {
  return assert.equal(this.result.length, int);
});

Then('o resultado deve retornar erro', function () {
  return assert.deepStrictEqual(getByIdUseCase.hasErrors(), true);
});

Then('deve retornar a mensagem de erro {string}', function (string) {
  return assert.deepStrictEqual(getByIdUseCase.getErrors()[0].message, string);
});
import { Given, Then } from "@cucumber/cucumber";
import { OrderQueue, OrderStatus } from "../../../src/domain/entities/OrderQueue";
import CreateUseCase from "../../../src/app/useCase/CreateUseCase";
import GetByIdUseCase from "../../../src/app/useCase/GetByIdUseCase";
import OrderQueueInMemoryRepository from '../../utils/repositoryInMemory/OrderQueueInMemoryRepository';
import assert from "assert";

const mockedOrder: OrderQueue = ({
  orderId: 1,
  status: OrderStatus.RECEBIDO,
  id: 1,
});

const orderQueueRepository = new OrderQueueInMemoryRepository();
const createUseCase = new CreateUseCase(orderQueueRepository);
let getByIdUseCase = new GetByIdUseCase(orderQueueRepository);

Given('inicio a obtenção do pedido da fila passando o id {int} como parametro', async function (int) {
  if (int == 1) {
    await saveMockOrder(mockedOrder);
  }
  getByIdUseCase = new GetByIdUseCase(orderQueueRepository);
  this.result = [await getByIdUseCase.execute(int)];
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

async function saveMockOrder(mock: OrderQueue | any): Promise<OrderQueue | null> {
  const created = await createUseCase.execute(mock);
  return created;
}
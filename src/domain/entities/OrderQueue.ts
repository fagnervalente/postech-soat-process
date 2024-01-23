export enum OrderStatus {
  RECEBIDO = "Recebido",
  EM_PREPARACAO = "Em preparação",
  PRONTO = "Pronto",
  FINALIZADO = "Finalizado"
}

export class OrderQueue {
  id?: number;
  status?: OrderStatus;
  orderId?: number;
}
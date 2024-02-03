import { Column, CreateDateColumn, Entity, ObjectIdColumn } from 'typeorm';

export enum OrderStatus {
  RECEBIDO = "Recebido",
  EM_PREPARACAO = "Em preparação",
  PRONTO = "Pronto",
  FINALIZADO = "Finalizado"
}

export enum OrderPaymentStatus {
  APROVADO = "Aprovado",
  RECUSADO = "Recusado",
  AGUARDANDO = "Aguardando pagamento"
}

@Entity('orders')
export class OrderQueueModel {
  @ObjectIdColumn()
  id?: string;

  @Column({
    type: "enum",
    enum: OrderStatus,
    default: OrderStatus.RECEBIDO
  })
  status?: OrderStatus;

  @Column({
    type: "enum",
    enum: OrderPaymentStatus,
    default: OrderPaymentStatus.AGUARDANDO
  })
  paymentStatus?: OrderPaymentStatus;

  @Column({type: "string"})
  orderId?: string;

  @CreateDateColumn()
  createdAt: Date;

  constructor(
    id: string | undefined,
    status: OrderStatus | undefined,
    paymentStatus: OrderPaymentStatus | undefined,
    orderId: string | undefined,
  ) {
    this.id = id;
    this.status = status;
    this.paymentStatus = paymentStatus;
    this.orderId = orderId;
  }
}
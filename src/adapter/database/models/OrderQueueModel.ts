import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum OrderStatus {
  RECEBIDO = "Recebido",
  EM_PREPARACAO = "Em preparação",
  PRONTO = "Pronto",
  FINALIZADO = "Finalizado"
}

@Entity('orders')
export class OrderQueueModel {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    type: "enum",
    enum: OrderStatus,
    default: OrderStatus.RECEBIDO
  })
  status?: OrderStatus;

  @Column()
  orderId?: number;

  constructor(
    id: number | undefined,
    status: OrderStatus | undefined,
    orderId: number | undefined,
  ) {
    this.id = id;
    this.status = status;
    this.orderId = orderId;
  }
}
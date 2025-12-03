// events.ts
export type UUID = string

export interface OrderItem {
  id: string
  name: string
  // description?: string | undefined;
  price: number
  quantity: number
  weight: number
  measurement: string
}

export type PaymentMethod = 'COD' | 'ONLINE'

export interface OrderPublishedEvent {
  orderId: UUID
  email?: string
  items: OrderItem[]
  paymentMethod: PaymentMethod
  createdAt: string
}

export interface OrderStockConfirmedEvent {
  orderId: UUID
  valid: true
  checkedAt: string
}

export interface OrderStockRejectedEvent {
  orderId: UUID
  valid: false
  missing: { productId: string; available: number; requested: number }[]
  checkedAt: string
}

export interface OrderCreatedEvent {
  orderId: UUID
  status: 'CREATED'
  email?: string
  createdAt: string
}

export interface OrderCancelledEvent {
  orderId: UUID
  status: 'CANCELLED'
  email?: string
  reason?: string
  cancelledAt: string
}

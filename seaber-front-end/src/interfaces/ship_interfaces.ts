
export interface PortCall {
  portCallId: number,
  arrivingAt: Date,
  leavingAt: Date,
  portName: string
}

export interface Handling {
  portCallId: number,
  duration: number
}

export interface Order {
  loading: Handling,
  discharging: Handling,
  orderId: string,
}

export interface ApiData {
  portCalls: Array<PortCall>,
  orders: Array<Order>
}

export default ApiData;
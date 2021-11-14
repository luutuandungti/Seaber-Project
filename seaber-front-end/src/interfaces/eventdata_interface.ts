export type Event = 'Loading' | 'Discharging' | 'Idle' | 'Laden' | 'Ballast' | 'Error';

export interface Status {
  event: Event,
  portName: string,
  orderId: string,
  start: number,
  duration: number,
}

export default Status;
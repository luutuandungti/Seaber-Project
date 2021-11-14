import ApiData from "../interfaces/ship_interfaces";
import { Event, Status } from '../interfaces/eventdata_interface';

function apiToEvents(data: ApiData): Status[] {
  const status: Status[] = [];
  let cargos = 0;
  let startTime = 0;

  const portCallsArrivingOrdered = data.portCalls
    .splice(0)
    .sort((a, b) => a.arrivingAt.getTime() - b.arrivingAt.getTime());

  for (const portCall of portCallsArrivingOrdered) {
    const portName = portCall.portName;

    if (startTime) {
      const movingEvent: Event = cargos ? 'Laden' : 'Ballast';

      status.push(
        {
          event: movingEvent,
          portName: '',
          orderId: '',
          start: startTime,
          duration: portCall.arrivingAt.getTime() - startTime,
        })
    } else {
      startTime = portCall.arrivingAt.getTime();
    }

    //Discharing order before loading
    data.orders.forEach(element => {
      if (element.discharging.portCallId === portCall.portCallId) {
        status.push(
          {
            event: 'Discharging',
            portName: portName,
            orderId: element.orderId,
            start: startTime,
            duration: element.discharging.duration,
          });
        startTime += element.discharging.duration;
        cargos -= 1;
      }
    });

    //Loading
    data.orders.forEach(element => {
      if (element.loading.portCallId === portCall.portCallId) {
        status.push(
          {
            event: 'Loading',
            portName: portName,
            orderId: element.orderId,
            start: startTime,
            duration: element.loading.duration,
          });
        startTime += element.loading.duration;
        cargos += 1;
      }
    })

    if (startTime < portCall.leavingAt.getTime()) {
      status.push(
        {
          event: 'Idle',
          portName: portName,
          orderId: '',
          start: startTime,
          duration: portCall.leavingAt.getTime() - startTime,
        });
      startTime = portCall.leavingAt.getTime();
    }
  }

  return status;
}

export default apiToEvents;
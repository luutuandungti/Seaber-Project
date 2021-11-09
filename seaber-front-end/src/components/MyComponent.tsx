import React from 'react';
import SingleEvent from './SingleEvent';
import ApiData from '../interfaces/ship_interfaces'

type Event = 'Loading' | 'Discharging' | 'Idle' | 'Laden' | 'Ballast' | 'Error';

function MyComponent({ data }: { data: ApiData }) {
  const tableHead = {
    backgroundColor: 'gray',
  };

  let cargos = 0;
  let startTime = 0;

  const status = [];

  //The algorithm is based on the observation that portCallId are unique and in timely order, starting from 1. 
  const maxPortCalls = data.portCalls.length;

  for (let i = 1; i <= maxPortCalls; i++) {
    const portCall = data.portCalls.find(element => element.portCallId === i);
    let portName = '';
    if (portCall) {
      portName = portCall.portName;

      //Moving status
      if (startTime) {
        const movingEvent: Event = cargos ? 'Laden' : 'Ballast';

        status.push(<SingleEvent status=
          {{
            event: movingEvent,
            portName: '',
            orderId: '',
            start: startTime,
            duration: portCall.arrivingAt.getTime() - startTime,
          }} />
        );
      }

      startTime = portCall.arrivingAt.getTime()

      //Discharing order before loading
      data.orders.forEach(element => {
        if (element.discharging.portCallId === i) {

          status.push(<SingleEvent status=
            {{
              event: 'Discharging',
              portName: portName,
              orderId: element.orderId,
              start: startTime,
              duration: element.discharging.duration,
            }} />
          );
          startTime += element.discharging.duration;
          cargos -= 1;
        }
      })

      //Loading
      data.orders.forEach(element => {
        if (element.loading.portCallId === i) {
          status.push(<SingleEvent status=
            {{
              event: 'Loading',
              portName: portName,
              orderId: element.orderId,
              start: startTime,
              duration: element.loading.duration,
            }} />
          );
          startTime += element.loading.duration;
          cargos += 1;
        }
      })

      if (startTime < portCall.leavingAt.getTime()) {
        status.push(<SingleEvent status=
          {{
            event: 'Idle',
            portName: portName,
            orderId: '',
            start: startTime,
            duration: portCall.leavingAt.getTime() - startTime,
          }} />
        )
        startTime = portCall.leavingAt.getTime();
      }
    } else {
      console.log('error finding portcall');
      status.push(<SingleEvent status=
        {{
          event: 'Error',
          portName: `Port id ${i} is missing`,
          orderId: 'Error',
          start: 0,
          duration: 0,
        }} />
      )
    }
  }

  return (
    <div className='Time Table'>
      <table>
        <tr style={tableHead}>
          <th>Event</th>
          <th>Port Name</th>
          <th>Order id</th>
          <th>Started at</th>
          <th>Ended at</th>
          <th>Duration (h)</th>
        </tr>
        {status}
      </table>
    </div>
  );
}

export default MyComponent;

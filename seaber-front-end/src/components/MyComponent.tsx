import React from 'react'
import ApiData from '../interfaces/ship_interfaces'

type Event = "Loading" | "Discharging" | "Idle" | "Laden" | "Ballast";

const timeFormat = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };

interface Status {
  event: Event,
  portName: string,
  orderId: string,
  start: number,
  duration: number,
}

function SingleEvent({ status }: { status: Status }) {
  return (
    <tr>
      <td>{status.event}</td>
      <td>{status.portName}</td>
      <td>{status.orderId}</td>
      <td>{new Date(status.start).toLocaleString('en-US')}</td>
      <td>{new Date(status.start + status.duration).toLocaleString()}</td>
      <td>{status.duration / 3600000}</td>
    </tr>
  )
}


function MyComponent({ data }: { data: ApiData }) {

  let cargos = 0;
  let startTime = 0;

  const status = [];

  //The algorithm is based on the observation that portCallId are unique and in timely order, starting from 1. 
  const maxPortCalls = data.portCalls.length;

  for (let i = 1; i <= maxPortCalls; i++) {
    const portCall = data.portCalls.find(element => element.portCallId === i);
    let portName = "";
    if (portCall) {
      portName = portCall.portName;

      //Moving status
      if (startTime) {
        const movingEvent: Event = cargos ? "Laden" : "Ballast";

        status.push(<SingleEvent status=
          {{
            event: movingEvent,
            portName: "",
            orderId: "",
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
              event: "Discharging",
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
              event: "Loading",
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
            event: "Idle",
            portName: portName,
            orderId: "",
            start: startTime,
            duration: portCall.leavingAt.getTime() - startTime,
          }} />
        )
        startTime = portCall.leavingAt.getTime();
      }
    } else {
      console.log("error finding portcall")
    }
  }

  return (
    <div>
      <table>
        <tr>
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

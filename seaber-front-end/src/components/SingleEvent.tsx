import React from 'react';

type Event = 'Loading' | 'Discharging' | 'Idle' | 'Laden' | 'Ballast' | 'Error';

export interface Status {
  event: Event,
  portName: string,
  orderId: string,
  start: number,
  duration: number,
}

function SingleEvent({ status }: { status: Status }) {
  const timeFormat = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
  const lineStyle = {
    backgroundColor: 'blue'
  };

  if (status.event === 'Idle' || status.event === 'Ballast') {
    lineStyle.backgroundColor = 'red';
  } else if (status.event === 'Loading') {
    lineStyle.backgroundColor = 'green';
  } else if (status.event === 'Discharging') {
    lineStyle.backgroundColor = 'orange';
  }
  return (
    <tr style={lineStyle}>
      <td>{status.event}</td>
      <td>{status.portName}</td>
      <td>{status.orderId}</td>
      <td>{new Date(status.start).toLocaleString()}</td>
      <td>{new Date(status.start + status.duration).toLocaleString()}</td>
      <td>{status.duration / 3600000}</td>
    </tr>
  )
}

export default SingleEvent;
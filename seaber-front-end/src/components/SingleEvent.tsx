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
    backgroundColor: 'blue',
    color: 'white'
  };

  switch (status.event) {
    case 'Idle':
    case 'Ballast':
      lineStyle.backgroundColor = 'orange';
      break;
    case 'Loading':
      lineStyle.backgroundColor = 'blue';
      break;
    case 'Discharging':
      lineStyle.backgroundColor = 'green';
      break;
    case 'Error':
      lineStyle.backgroundColor = 'red';
      break;
    default:
      break;
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
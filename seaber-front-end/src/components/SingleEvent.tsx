import React from 'react';
import Status from '../interfaces/eventdata_interface';

function SingleEvent({ status }: { status: Status }) {
  const lineStyle = {
    backgroundColor: 'blue',
    color: 'white'
  };

  const timeformat: Intl.DateTimeFormatOptions =
    { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour12: false };

  const timeStart = new Date(status.start)
    .toLocaleTimeString(
      'en-US',
      timeformat);

  const timeEnd = new Date(status.start + status.duration)
    .toLocaleTimeString(
      'en-US',
      timeformat);

  const durationInHour = status.duration / 3600000;


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
      <td>{timeStart}</td>
      <td>{timeEnd}</td>
      <td>{durationInHour}</td>
    </tr>
  )
}

export default SingleEvent;
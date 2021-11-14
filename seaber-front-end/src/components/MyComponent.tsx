import React from 'react';
import SingleEvent from './SingleEvent';
import ApiData from '../interfaces/ship_interfaces';
import apiToEvents from '../functions/functionApiToEvent';

function MyComponent({ data }: { data: ApiData }) {
  const tableHead = {
    backgroundColor: 'gray',
  };

  const statusData = apiToEvents(data);
  const eventsList = [];

  for (const status of statusData) {
    eventsList.push(<SingleEvent status={status} key={statusData.indexOf(status)} />);
  }

  return (
    <div className='Time Table'>
      <table>
        <thead>
          <tr style={tableHead}>
            <th>Event</th>
            <th>Port Name</th>
            <th>Order id</th>
            <th>Started at</th>
            <th>Ended at</th>
            <th>Duration (h)</th>
          </tr>
        </thead>
        <tbody>
          {eventsList}
        </tbody>
      </table>
    </div>
  );
}

export default MyComponent;

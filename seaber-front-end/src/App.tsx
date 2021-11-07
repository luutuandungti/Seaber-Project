import React from 'react';
import './App.css';
import ApiData from './interfaces/ship_interfaces';
import MyComponent from './components/MyComponent';

function App() {

  const Example1: ApiData = {
    portCalls: [
      {
        portCallId: 1,
        arrivingAt: new Date("2021-10-11 11:00"),
        leavingAt: new Date("2021-10-14 11:00"),
        portName: "Porvoo",
      },
      {
        portCallId: 2,
        arrivingAt: new Date("2021-10-20 11:00"),
        leavingAt: new Date("2021-10-23 11:00"),
        portName: "Vaasa",
      },
    ],

    orders: [
      {
        orderId: "123/Spagetti",
        loading: {
          duration: 3 * 60 * 60 * 1000,
          portCallId: 1,
        },
        discharging: {
          duration: 5 * 60 * 60 * 1000,
          portCallId: 2,
        },
      },
    ],
  };


  const Example2: ApiData = {
    portCalls: [
      {
        portCallId: 2,
        arrivingAt: new Date("2021-01-07 11:00"),
        leavingAt: new Date("2021-01-08 11:00"),
        portName: "Tallin",
      },
      {
        portCallId: 1,
        arrivingAt: new Date("2021-01-01 11:00"),
        leavingAt: new Date("2021-01-02 11:00"),
        portName: "Riga",
      },
      {
        portCallId: 3,
        arrivingAt: new Date("2021-01-14 11:00"),
        leavingAt: new Date("2021-01-15 07:00"),
        portName: "Porvoo",
      },
      {
        portCallId: 4,
        arrivingAt: new Date("2021-01-21 11:00"),
        leavingAt: new Date("2021-01-22 11:00"),
        portName: "Helsinki",
      },
      {
        portCallId: 5,
        arrivingAt: new Date("2021-01-28 11:00"),
        leavingAt: new Date("2021-01-29 11:00"),
        portName: "Turku",
      },
    ],
    orders: [
      {
        loading: {
          portCallId: 1,
          duration: 3 * 60 * 60 * 1000,
        },
        discharging: {
          portCallId: 2,
          duration: 6 * 60 * 60 * 1000,
        },
        orderId: "101/Bananas",
      },
      {
        loading: {
          portCallId: 1,
          duration: 3 * 60 * 60 * 1000,
        },
        discharging: {
          portCallId: 2,
          duration: 6 * 60 * 60 * 1000,
        },
        orderId: "102/Apples",
      },
      {
        loading: {
          portCallId: 1,
          duration: 3 * 60 * 60 * 1000,
        },
        discharging: {
          portCallId: 3,
          duration: 6 * 60 * 60 * 1000,
        },
        orderId: "103/Bananas",
      },
      {
        loading: {
          portCallId: 1,
          duration: 3 * 60 * 60 * 1000,
        },
        discharging: {
          portCallId: 3,
          duration: 6 * 60 * 60 * 1000,
        },
        orderId: "104/Apples",
      },
      {
        loading: {
          portCallId: 1,
          duration: 3 * 60 * 60 * 1000,
        },
        discharging: {
          portCallId: 3,
          duration: 6 * 60 * 60 * 1000,
        },
        orderId: "105/Pears",
      },
      {
        loading: {
          portCallId: 2,
          duration: 2 * 60 * 60 * 1000,
        },
        discharging: {
          portCallId: 3,
          duration: 2 * 60 * 60 * 1000,
        },
        orderId: "106/Hotdogs",
      },

      {
        loading: {
          portCallId: 4,
          duration: 12 * 60 * 60 * 1000,
        },
        discharging: {
          portCallId: 5,
          duration: 12 * 60 * 60 * 1000,
        },
        orderId: "107/Beer",
      },
    ],
  };


  return (
    <div>
      <h1>Example 1</h1>
      <MyComponent data={Example1} />

      <h1>Example 2</h1>
      <MyComponent data={Example2} />
    </div>
  );
}

export default App;

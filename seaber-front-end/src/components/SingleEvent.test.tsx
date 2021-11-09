import React from "react";
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import SingleEvent from "./SingleEvent";

test('render content', () => {
  const component = render(
    <SingleEvent status=
      {{
        event: 'Idle',
        portName: 'Helsinki',
        orderId: 'Banana',
        start: 1100000,
        duration: 60000000,
      }} />
  )

  expect(component.container).toHaveTextContent('Helsinki');

})


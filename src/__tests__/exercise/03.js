// Avoid implementation details
// http://localhost:3000/counter

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Counter from '../../components/counter'

test('counter increments and decrements when the buttons are clicked', async () => {
  // Initialize instance of the userEvent by calling the setup method. This can also be implemented into a helper
  // function like in the following example: https://testing-library.com/docs/user-event/intro
  const user = userEvent.setup()
  render(<Counter />)

  // Instead of querying the DOM directly, you can use `screen.getByRole` to get a reference to the button. This avoids testing the implementation details of the component. Now the button can be refactored to a <div role="button"> for example without breaking the test.
  const increment = screen.getByRole('button', {name: /increment/i})
  const decrement = screen.getByRole('button', {name: /decrement/i})
  const message = screen.getByText(/current count/i)

  // userEvent dispatches the events like they would happen in the browser, for example if the "onClick" event was to be refactored to "onMouseDown" the test would still pass, whereas with fireEvent.click() it wouldn't pass. Becase with fireEvent it dispatches the event you tell it to and just those, thus testing on implementation details which is an anti-pattern.
  expect(message).toHaveTextContent('Current count: 0')
  await user.click(increment)
  expect(message).toHaveTextContent('Current count: 1')
  await user.click(decrement)
  expect(message).toHaveTextContent('Current count: 0')
})

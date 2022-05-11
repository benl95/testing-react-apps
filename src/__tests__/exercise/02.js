// simple test with React Testing Library
// http://localhost:3000/counter

import * as React from 'react'
import {render, fireEvent} from '@testing-library/react'
import Counter from '../../components/counter'

// The following test is done with React Testing library helper functions
// NOTE: Cleanup of the DOM is done automatically by React Testing Library, so manual cleanup is not // needed
test('counter increments and decrements when the buttons are clicked', () => {
  // Render the Counter component to the DOM by using the render helper function.
  // Returns an object with a bunch of utilities on it.
  // NOTE: A div element doesn't have to be created and appended to the DOM, the render function
  // does this for us.
  const {container} = render(<Counter />)
  const [decrement, increment] = container.querySelectorAll('button')
  const message = container.firstChild.querySelector('div')

  expect(message).toHaveTextContent('Current count: 0')
  // Use the fireEvent helper function to simulate a event on a DOM element.
  // The fireEvent function is a wrapper around the dispatchEvent function.
  // NOTE: The fireEvent function doesn't have to be wrapped in a act(() => {...}) function,
  // as React Testing library does this automatically for us.
  fireEvent.click(increment)
  expect(message).toHaveTextContent('Current count: 1')
  fireEvent.click(decrement)
  expect(message).toHaveTextContent('Current count: 0')
})

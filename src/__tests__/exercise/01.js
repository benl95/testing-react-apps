// simple test with ReactDOM
// http://localhost:3000/counter

import * as React from 'react'
import {act} from 'react-dom/test-utils'
import {createRoot} from 'react-dom/client'
import Counter from '../../components/counter'
import {render} from '@testing-library/react'

// NOTE: this is a new requirement in React 18
// https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#configuring-your-testing-environment
// Luckily, it's handled for you by React Testing Library :)
global.IS_REACT_ACT_ENVIRONMENT = true

// Cleanup by removing the div element from the DOM
beforeEach(() => {
  document.body.innerHTML = ''
})

test('counter increments and decrements when the buttons are clicked', () => {
  // Create a div and append the element to the DOM
  const div = document.createElement('div')
  document.body.append(div)
  // Render the Counter component to the div, note:
  act(() => {
    const root = createRoot(div)
    root.render(<Counter />)
  })
  // Get a reference to the buttons
  const [decrement, increment] = div.querySelectorAll('button')
  // Get a reference to the message counter
  const message = div.firstChild.querySelector('div')
  // Assert that the message is initially set to 0
  expect(message.textContent).toBe('Current count: 0')
  // Click the increment button
  act(() =>
    increment.dispatchEvent(
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        button: 0,
      }),
    ),
  )
  // Assert that the message is now set to 1
  expect(message.textContent).toBe('Current count: 1')
  // Click the decrement button
  act(() =>
    decrement.dispatchEvent(
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        button: 0,
      }),
    ),
  )
  // Assert that the message is now set to 0
  expect(message.textContent).toBe('Current count: 0')
})

/* eslint no-unused-vars:0 */

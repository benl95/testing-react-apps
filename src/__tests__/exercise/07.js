// testing with context and a custom render method
// http://localhost:3000/easy-button

import * as React from 'react'
import {render as rtlRender, screen} from 'test/test-utils'
import {ThemeProvider} from '../../components/theme'
import EasyButton from '../../components/easy-button'

function render(ui, {theme = 'light', options} = {}) {
  const Wrapper = ({children}) => {
    return <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
  }
  return rtlRender(ui, {wrapper: Wrapper, ...options})
}

test('renders with the light styles for the light theme', () => {
  const {rerender} = render(<EasyButton />)

  rerender(<EasyButton>Easy</EasyButton>)
  const button = screen.getByRole('button', {name: /easy/i})

  expect(button).toHaveStyle(`
    background-color: white;
    color: black;
  `)
})

test('renders with the dark styles for the dark theme', () => {
  const {rerender} = render(<EasyButton />, {theme: 'dark'})

  rerender(<EasyButton>Easy</EasyButton>)
  const button = screen.getByRole('button', {name: /easy/i})

  expect(button).toHaveStyle(`
    background-color: black;
    color: white;
  `)
})

/* eslint no-unused-vars:0 */

// mocking HTTP requests
// http://localhost:3000/login-submission

import * as React from 'react'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {build, fake} from '@jackfranklin/test-data-bot'
import {setupServer} from 'msw/node'
import {rest} from 'msw'
import {handlers} from '../../test/server-handlers'
import Login from '../../components/login-submission'

function getInputFieldsFromForm(...labels) {
  return labels.map((label, _) => screen.getByLabelText(label))
}

const buildLoginForm = build({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
})

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test(`logging in displays the user's username`, async () => {
  render(<Login />)
  const {username, password} = buildLoginForm()
  const [usernameInputField, passwordInputField] = getInputFieldsFromForm(
    /username/i,
    /password/i,
  )

  await userEvent.type(usernameInputField, username)
  await userEvent.type(passwordInputField, password)
  await userEvent.click(screen.getByRole('button', {name: /submit/i}))
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

  expect(screen.getByText(username)).toBeInTheDocument()
})

test('omitting the username results in an error', async () => {
  render(<Login />)
  const {password} = buildLoginForm()
  const [passwordInputField] = getInputFieldsFromForm(/password/i)

  // user doesn't enter a username
  await userEvent.type(passwordInputField, password)
  await userEvent.click(screen.getByRole('button', {name: /submit/i}))
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

  expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(
    `"username required"`,
  )
})

test('handles server error', async () => {
  const errorMessage = 'server error'
  server.use(
    rest.post(
      'https://auth-provider.example.com/api/login',
      (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({message: errorMessage}))
      },
    ),
  )
  render(<Login />)

  await userEvent.click(screen.getByRole('button', {name: /submit/i}))
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

  expect(screen.getByRole('alert')).toHaveTextContent(errorMessage)
})

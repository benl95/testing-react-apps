// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import faker from 'faker'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'

function getInputFieldsFromForm(...labels) {
  return labels.map((label, _) => screen.getByLabelText(label))
}

function buildLoginForm(overrides) {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    ...overrides,
  }
}

test('submitting the form calls onSubmit with username and password', async () => {
  const user = userEvent.setup()
  const handleSubmit = jest.fn()
  render(<Login onSubmit={handleSubmit} />)

  const {username, password} = buildLoginForm()
  const [usernameInputField, passwordInputField] = getInputFieldsFromForm(
    /username/i,
    /password/i,
  )

  await user.type(usernameInputField, username)
  await user.type(passwordInputField, password)
  await user.click(
    screen.getByRole('button', {
      name: /submit/i,
    }),
  )

  expect(handleSubmit).toHaveBeenCalledWith({
    username,
    password,
  })
  expect(handleSubmit).toHaveBeenCalledTimes(1)
})

/*
eslint
  no-unused-vars: "off",
*/

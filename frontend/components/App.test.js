// Write your tests here
import server from '../../backend/mock-server'
import React from 'react'
import AppFunctional from '../../frontend/components/AppFunctional'

import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

jest.setTimeout(1000) // default 5000 too long for Codegrade
const waitForOptions = { timeout: 100 }
const queryOptions = { exact: false }

let up, down, left, right, reset, submit
let squares, coordinates, steps, message, email

const updateStatelessSelectors = document => {
  up = document.querySelector('#up')
  down = document.querySelector('#down')
  left = document.querySelector('#left')
  right = document.querySelector('#right')
  reset = document.querySelector('#reset')
  submit = document.querySelector('#submit')
}

const updateStatefulSelectors = document => {
  squares = document.querySelectorAll('.square')
  coordinates = document.querySelector('#coordinates')
  steps = document.querySelector('#steps')
  message = document.querySelector('#message')
  email = document.querySelector('#email')
}

const testSquares = (squares, activeIdx) => {
  squares.forEach((square, idx) => {
    if (idx === activeIdx) {
      expect(square.textContent).toBe('B')
      expect(square.className).toMatch(/active/)
    } else {
      expect(square.textContent).toBeFalsy()
      expect(square.className).not.toMatch(/active/)
    }
  })
}

test('AppFunctional is a functional component, Review how to build a functional component, including useState and passing props.', () => {
  expect(
    AppFunctional.prototype &&
    AppFunctional.prototype.isReactComponent
  ).not.toBeTruthy()
})
test('sanity', () => {
  expect(true).toBe(false)
})

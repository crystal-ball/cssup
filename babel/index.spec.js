// src/__tests__/index-test.js
const babel = require('babel-core')
const plugin = require('./index')
const { readFileSync } = require('fs')

// Runs relative to repo root
const content = readFileSync('./src/index.js')

it('transforms cssup tagged template literals', () => {
  const { code } = babel.transform(content, { plugins: [plugin] })
  expect(code).toMatchSnapshot()
})

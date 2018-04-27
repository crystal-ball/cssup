// src/__tests__/index-test.js
const babel = require('babel-core')
const { readFileSync } = require('fs')

const plugin = require('./plugin')

// Runs relative to repo root
const content = readFileSync('./src/index.js')

it('transforms cssup tagged template literals', () => {
  const { code } = babel.transform(content, { plugins: [plugin] })
  expect(code).toMatchSnapshot()
})

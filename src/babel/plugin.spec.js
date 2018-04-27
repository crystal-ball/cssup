const babel = require('babel-core')
const { readFileSync } = require('fs')
const { resolve } = require('path')

const plugin = require('./plugin')

// Runs relative to repo root
const content = readFileSync(resolve(__dirname, '../../test/content.js'))

it('transforms cssup tagged template literals', () => {
  const { code } = babel.transform(content, { plugins: [plugin] })
  expect(code).toMatchSnapshot()
})

// ⚠️ TODO: attach test fn to secret global bridge and test passed css with a snapshot!

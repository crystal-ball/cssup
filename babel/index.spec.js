// src/__tests__/index-test.js
const babel = require('babel-core')
const plugin = require('./index')

var example = `
const regularVariable = 'test'

const testStyles = cssup\`
.test {
  color: 'blue';
}\`

const skipTemplateString = trick\`don't interact\`
`

it('works', () => {
  const { code } = babel.transform(example, { plugins: [plugin] })
  expect(code).toMatchSnapshot()
})

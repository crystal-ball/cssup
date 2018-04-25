// src/__tests__/index-test.js
const babel = require('babel-core')
const plugin = require('./babel/index')
const { readFileSync } = require('fs')

const example = readFileSync('./content.js')

const { code } = babel.transform(example, { plugins: [plugin] })

console.log('🏁 CODE: ')
console.log(code)

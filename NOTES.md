## Handbook

https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md

## Explorer

http://astexplorer.net/

## Terms

* `quasi-literal` original term for template string

## Conditions

* When inside of a tagged template expression, for each of the expressions,
  those are the nodes we want to move into the classnames function. If it's an
  `ObjectExpression` we want the `properties` and if it's a `Literal` we want
  the `value`.
* Assembling the contents of the styles is concatenating all of the `quasis`'s
  `TemplateElement.raw` values.
* ✅ When manipulating: replace the entire `TaggedTemplateExpression` with either
  a `Literal` node for static class names or an `ObjectExpression` for dynamic
  classes (note that `TaggedTemplateExpression` may be the
  `VariableDeclarator.init` or it may be the
  `VariableDeclarator.init.ArrowFunctionExpression.body`)

## AST

Basic tree:

* `VariableDeclaration` which has declaration

```javascript
const VariableDeclaration = {
  type: 'VariableDeclaration',
  declarations: []
}

// declarations is single element
const declarations = [
  {
    type: 'VariableDeclarator'
    // TaggedTemplateExpression|ArrowFunctionExpression
    init: {}
  }
]

// `init` can be a TTExpression, ArrowFunctionExpression, ...
const TaggedTemplateExpression = {
  type: 'TaggedTemplateExpression',
  // The tag could be used to know the TTE is one we want to target
  tag: {
    type: 'Identifier',
    name: 'cssup'
  }
  // The quasi is the entire template string
  quasi: {
    type: 'TemplateLiteral'
    expressions: [], // template string expressions
    quasis: [] // template string content
  }
}

// Quasis - literal values of template string
const quasis = [
  {
    type: 'TemplateElement',
    value: {
      raw: '',
      cooked: ''
    }
  }
]

// Expressions - dynamic content of template string
const expressions = [
  {
    // Object definition
    type: 'ObjectExpression',
  },
  {
    // Literal string
    type: 'Literal'
  }
]

const ObjectExpression = {
  type: 'ObjectExpression',
  properties: [
    {
      type: 'Property'
      key: {}
      value: {}
    }
  ]
}

// Literal values, eg a string
const Literal = {
  type: 'Literal'
  value: ''
}

// When using an arrow function for dynamic class name additions
const ArrowFunctionExpression = {
  type: 'ArrowFunctionExpression',
  body: TaggedTemplateExpression
}
```

## Plugin Visitor

* Visitor `state` has a property `file`...
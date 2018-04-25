// Reference to super secret registration function, we only want to call this if it
// has been set by a build tool
const secretKey =
  '__SUPER_SECRET_CSSUP_BRIDGE_DO_NOT_USE_THIS_OR_CHAUNCEY_WILL_BECOME_VERY_UPSET'

/**
 *
 * @param {Object} babel
 */
module.exports = function(babel) {
  const { types: t } = babel

  return {
    visitor: {
      // visitor contents
      TaggedTemplateExpression(path, state) {
        const { sourceFileName } = state.file.opts

        // If this is not a `cssup` TTE, we're done
        if (!path.get('tag').isIdentifier({ name: 'cssup' })) return

        // Get the entire template string
        // This is type `TemplateLiteral
        const quasi = path.get('quasi')

        // Get all of the quasis and expressions from the quasi
        const quasis = quasi.get('quasis')
        const expressions = quasi.get('expressions')

        // Create only the CSS contents by concatenating all of the quasis
        const css = quasis.reduce(
          (acc, curr) => (acc += curr.get('value').node.cooked),
          `/* ${sourceFileName} */\n`
        )

        // When being used with build tooling, register the extracted class name
        if (global[secretKey] && global[secretKey].registerClassName) {
          global[secretKey].registerClassName(css, {
            id: sourceFileName,
            fileName: sourceFileName
          })
        }

        // Static styles definition, replace node with a static value
        if (expressions.length === 0) {
          return path.replaceWith(t.stringLiteral('static-class'))
        }

        const dynamicClassNamesProperties = []
        expressions.forEach(expression => {
          const properties = expression.get('properties')

          properties.forEach(property => {
            const keyNode = property.get('key')
            const valueNode = property.get('value')

            dynamicClassNamesProperties.push(
              t.objectProperty(
                keyNode.node,
                valueNode.node,
                t.isTemplateLiteral(keyNode)
              )
            )
          })
        })

        return path.replaceWith(t.objectExpression(dynamicClassNamesProperties))
      }
    }
  }
}

// const dynamicClassNames = t.objectExpression([
//   t.objectProperty('key','value')
// ])

// console.log('expressions: ', expressions)

// REPLACING A NODE:
// path.replaceWith(t.binaryExpression('**', path.node.left, t.numberLiteral(2)))

// if (t.isIdentifier(keyNode)) {
//   key = t.identifier(keyNode.node.name)
// } else if (t.isStringLiteral(keyNode)) {
//   key = t.stringLiteral(keyNode.node.value)
// } else if (t.isTemplateLiteral()) {
//   // ⚠️ TODO: key = t.templateLiteral(quasis, expressions)
//   key = t.stringLiteral('key')
// } else {
//   console.warn('unhandled key type: ', keyNode.node)
// }

// console.log(keyNode.node)

// const key = t.stringLiteral('key')

// ⚠️ TODO: handle template literal...
// console.log('Computed: ', keyNode.node.computed)
// console.log(keyNode.get('computed'))

// const key = t.isTemplateLiteral(keyNode)
//   ? t.stringLiteral('key')
//   : keyNode.node

// const value = t.identifier('value')

// dynamicClassNamesProperties.push(
//   t.objectProperty(key, valueNode.node)
// )

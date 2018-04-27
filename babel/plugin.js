crypto = require('crypto')

/** Matches the primary class name of a style block */
const primaryClassNameRegex = /^\s*\.([^{\s]+)/m

/** Create a hash of a string use md5 hashing */
const createHash = content =>
  crypto
    .createHash('md5')
    .update(content)
    .digest('hex')
    .slice(0, 6)

/** Extract the primary class name from a style block */
const parseClassName = css => {
  const match = css.match(primaryClassNameRegex)
  // ⚠️ TODO: check for more than one class name or no class names and log an error
  return match && match[1] ? match[1] : null
}

// Reference to super secret registration function, we only want to call this if it
// has been set by a build tool
const secretKey =
  '__SUPER_SECRET_CSSUP_BRIDGE_DO_NOT_USE_THIS_OR_CHAUNCEY_WILL_BECOME_VERY_UPSET'

/**
 * Babel plugin returns an object that defines node visitors, the only node that we
 * care about is Tagged Template Expressions
 * @param {Object} babel The Babel context
 */
module.exports = ({ types: t }) => ({
  visitor: {
    TaggedTemplateExpression(path, state) {
      // If this is not a `cssup` TTE, we're done
      if (!path.get('tag').isIdentifier({ name: 'cssup' })) return

      const { sourceFileName } = state.file.opts

      // Get the entire template string node (`TemplateLiteral`)
      const quasi = path.get('quasi')

      // Get all of the quasis and expressions from the template string
      const quasis = quasi.get('quasis')
      const expressions = quasi.get('expressions')

      // Create only the CSS contents by concatenating all of the quasis
      const css = quasis.reduce(
        (acc, curr) => (acc += curr.get('value').node.cooked),
        `/* ${sourceFileName} */\n`,
      )

      /*
       * Processing of styles may be async, AND we only care about hashing the
       * primary class name for a styles block, SO in this plugin we create a
       * hash and replace the primary class name with it.
       *
       * ℹ️ The hash should always be unique, even if styles have the same content
       * because we include the filepath as a comment in the content 😉
       */
      const hash = createHash(css)
      const className = parseClassName(css)
      const hashedClassName = `${className}--${hash}`

      // When being used with build tooling, register the extracted class name
      if (global[secretKey] && global[secretKey].registerClassName) {
        const processedCSS = css.replace(primaryClassNameRegex, hashedClassName)

        global[secretKey].registerClassName(processedCSS, {
          id: hashedClassName,
          fileName: sourceFileName,
        })
      }

      // Static styles definition, replace node with a static value
      if (expressions.length === 0) {
        return path.replaceWith(t.stringLiteral(hashedClassName))
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
              t.isTemplateLiteral(keyNode),
            ),
          )
        })
      })

      // creates function `cssup(hashedClassName, { dynamicClassNames })
      return path.replaceWith(
        t.callExpression(t.identifier('cssup'), [
          t.stringLiteral(hashedClassName),
          t.objectExpression(dynamicClassNamesProperties),
        ]),
      )
    },
  },
})

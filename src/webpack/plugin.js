const postcss = require('postcss')
const postcssNested = require('postcss-nested')

/**
 * Map contains all of the styles for a compilation, map is reset for each
 * compilation
 */
let stylesMap

/**
 * The default processor uses postCSS with support for nested syntax. See docs for
 * roadmap on supporting additional syntax
 */
const postcssProcessor = postcss([postcssNested])

/**
 * Plugin handles processing all of the style block entries for each compilation
 * of an application.
 */
class CSSUpPlugin {
  apply(compiler) {
    // Hooks into the compilation event...
    compiler.hooks.compilation.tap('CSSUp', compilation => {
      stylesMap = new Map()

      // Hook into additional assets hook to emit processed stylesheet
      compilation.hooks.additionalAssets.tapAsync('CSSUp', callback => {
        const stylesheet = Array.from(stylesMap.entries()).reduce(
          (acc, curr) => (acc += curr[1]),
          '',
        )

        postcssProcessor
          // ⚠️ TODO: Does the from and to matter for our usage??
          .process(stylesheet, { from: 'styles.css', to: 'styles.css' })
          .then(({ css }) => {
            // The asset file is included in the webpack compilation 🎉
            // ⚠️ TODO: make emitted file name configurable with plugin options
            compilation.assets['styles.css'] = {
              source() {
                return css
              },
              size() {
                return css.length
              },
            }

            callback()
          })
      })
    })
  }
}

CSSUpPlugin.registerClassName = (css, { id, fileName }) => {
  // Set the class to map using id (hashed class name) so that if a file is
  // imported multiple times, we only include the styles once
  stylesMap.set(id, css)
}

// Set the plugin on global so that the Babel plugin can reference it and call the
// registerClassName hook.
global.__SUPER_SECRET_CSSUP_BRIDGE_DO_NOT_USE_THIS_OR_CHAUNCEY_WILL_BECOME_VERY_UPSET = CSSUpPlugin
module.exports = CSSUpPlugin

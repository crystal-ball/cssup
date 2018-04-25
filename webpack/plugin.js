const stylesMap = new Map()

class CSSUpPlugin {
  apply(compiler) {
    compiler.hooks.thisCompilation.tap('CSSUp', compilation => {
      // ℹ️ During additional assets hook, handle adding stylesheet to build assets
      compilation.hooks.additionalAssets.tapAsync('CSSUp', callback => {
        // Create stylesheet
        const stylesheet = Array.from(stylesMap.entries()).reduce(
          (acc, curr) => (acc += curr[1]),
          ''
        )

        // The asset file is included in the webpack compilation 🎉
        compilation.assets['styles.css'] = {
          source() {
            return stylesheet
          },
          size() {
            return stylesheet.length
          }
        }

        callback()
      })
    })
  }
}

CSSUpPlugin.registerClassName = (css, opts) => {
  // Set the class to map so that if a file is imported multiple times, we only
  // include the styles once
  // ℹ️ The id is set to the file name in Babel plugin
  stylesMap.set(opts.id, css)
}

global.__SUPER_SECRET_CSSUP_BRIDGE_DO_NOT_USE_THIS_OR_CHAUNCEY_WILL_BECOME_VERY_UPSET = CSSUpPlugin
module.exports = CSSUpPlugin

# CSSUp

Colocate css style definitions with class name conditions to level up your CSS
workflow!

## 📝 Process

This is the goal for the initial supported workflow (purposely as simple as
possible, future enhancements can be added to the roadmap)

1.  Styles are written in component files using a Tagged Template String (TTS)
1.  Babel plugin is included in `.babelrc` and during Babel transpile CSSUp TTSs
    are transpiled to class names:
    1.  CSS with static class name(s) usage is transpiled to a string of the
        class name(s)
    1.  CSS with dynamic class name(s) usage is transpiled to an arrow function
        returning a `classnames` compatible object.
    1.  Transpiled class name(s) value is used in component (eg with
        `classNames` for JSX)
1.  During transpile Babel plugin checks for a build tool registration and if
    one exists, calls it with the file info and CSS from the TTS quasis (the
    static content of the TTS).
1.  Build tool (webpack plugin) registers class names and then processes to
    valid CSS and emits a stylesheet to build assets.

## ✅ Todo

* [ ] Add a default CSS processor setup to the webpack plugin that supports a
      complete set of sensible features. 🤔 Thinking a PostCSS setup that
      supports SASSy syntax with local modules, variables, mixins, etc would
      provide features needed without requiring `node-sass` be a dependency of
      CSSUp
* [ ] After processing of the CSS file we need to extract the unique class name
      and include it as either Babel transform literal value or as part of the
      dynamic class names object expression (with default value true). We'll
      probably need to make this the return value of `registerClassName`.
* [ ] Create configuration and example usage documentation.

## 🛣 Roadmap

* [ ] Enhance the CSS processor used by the webpack plugin to be configurable so
      you can use whatever (pre/post)processor setup you want.
* [ ] Look into development env setup, initial process is going to emit an asset
      at end of build, so page will have to be reloaded to update styles.
      Investigate including CSS value in a CSSUp TTS during dev environments and
      using a `cssup` function to inject styles to a DOM node.
* [ ] Split repo up into a mono-repo with Babel and webpack packages. Add a
      syntax highlighter using [`vscode-styled-components`][styled] as an
      example. Explore creating an Ember addon...
* [ ] Add configuration option for minifying CSS with css nano.
* [ ] Add configuration option to emit each registered class as a file for
      library authors (allow library authors to write CSS for library components
      in the component files, then emit as importable partials during a library
      transpile build stage)
* [ ] Check classnames used against parsed content to ensure they're valid

[styled]: https://github.com/styled-components/vscode-styled-components

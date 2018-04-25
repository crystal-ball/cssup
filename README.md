# CSSUp

Colocate css style definitions with class name conditions to level up your CSS
workflow!

## 📝 Process

This is the goal for the initial supported workflow (purposely as simple as
possible, future enhancements can be added to the roadmap)

## ✅ Todo

* [ ] Add a default CSS processor setup to the webpack plugin that supports a
      complete set of sensible features.
      🤔 Thinking a PostCSS setup that supports SASSy syntax with local modules,
      variables, mixins, etc would provide features needed without requiring
      `node-sass` be a dependency of CSSUp
* [ ] After processing of the CSS file we need to extract the unique class name
      and include it as either Babel transform literal value or as part of the
      dynamic class names object expression (with default value true). We'll
      probably need to make this the return value of `registerClassName`.
* [ ] Create configuration and example usage documentation.

## 🛣 Roadmap

* [ ] Enhance the CSS processor used by the webpack plugin to be configurable so
      you can use whatever (pre/post)processor setup you want.
* [ ] Split repo up into a mono-repo with Babel and webpack packages. Add a
      syntax highlighter using [`vscode-styled-components`][styled] as an
      example. Explore creating an Ember addon...
* [ ] Add configuration option for minifying CSS with css nano.
* [ ] Add configuration option to emit each registered class as a file for
      library authors (allow library authors to write CSS for library components
      in the component files, then emit as importable partials during a library
      transpile build stage)

[styled]: https://github.com/styled-components/vscode-styled-components

# PostCSS

[_PostCSS_](http://postcss.org/)

Use postCSS with plugins as default processor to provide most common set of
desired functionality without the overhead of `node-sass`.

Include customization hook that includes the current set of plugins and accepts
any array of plugins.

* [postcss-nested][nested]
* [postcss-comments][comments]

USE JS FOR FUNCTIONS??? https://github.com/andyjansson/postcss-functions

SHORT TERM: `@` at-rule allows functions and mixins...

## Imports and URLs

⚠️ Need to understand the PostCSS `from` option...

## Ideal

* comments (including sassy comments) ⚠️ `postcss-comments` does some real jank
  where it creates a new tokenizer and reparses the root input... don't use
* variables (sassy, important for maps and functions)
* custom properties
* functions i. Replace mixins with functions returning `{}`?? ii. Default arg
  values should use `=`

(no mixins, ability to return `{}` from a function that will be mixed in)

## Roadmap

_Now_: use `advanced-variables` for developing and testing, define ideal syntax
_Next_: create `cssup` parser for PostCSS to enable ideal syntax, write postcss
plugins where needed. _Later_: Work with PostCSS to add `visitor` concept to
PostCSS to allow plugins to work like Babel plugins?

Ultimately it would be great to extend the PostCSS compiler to support a syntax
that feels more familiar to JS devs to simplify writing maintainable CSS. The
custom properties, and calc and etc spec are all really weird and require
learning lots of stuff that isn't even useful with older browsers...

### Maps

Provide maps that behave like JS objects:

```scss
$font-family: var(--font-family);

:root {
  --font-family: $font-family;
}

// Provide maps with object like declaration syntax and property accessors
$map: {
  key: value
  ...
}

// Accessors
$map.key
$map[$variable]
```

### Iteration

Provide loops for iterating over sets that behave like JS for loops:

```
for (key in object) {
  // ...
}
```

## Recommended plugins

* [postcss-custom-properties][custom-properties]

```scss
// --- Ideal Syntax

// Variables
$variable: blue !default;
```

## Resources

* See the [Super Tiny Compiler][tiny-compiler] for an overview of the typical
  steps executed by a compiler. This is good background knowledge to have for
  working with PostCSS plugins which are actually _transforms_ with access to
  the entire generated AST.

#### Base

postcss-import - provides @import cssnext??

#### SASSy

postcss-nested - nested rules... postcss-advanced-variables - variables,
conditionals, and iterators postcss-extend-rule - provides @extend
postcss-mixins - define mixins

#### Scoping

postcss-modules ??postcss-modules-local-by-default - makes rules `:local` scope
by default ??postcss-modules-scope - adds local/global scoping as a feature

#### CSS Modules

postcss-modules-extract-imports - transform `composes` calls...

#### Production

autoprefixer - vendor prefixing cssnano - minification css-mqpacker -
consolidate media queries

https://github.com/webpack-contrib/css-loader

<!-- Link -->

[nested]: https://github.com/postcss/postcss-nested
[custom-properties]: https://github.com/postcss/postcss-custom-properties
[comments]: https://github.com/zoubin/postcss-comment

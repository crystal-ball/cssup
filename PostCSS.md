# PostCSS

Use postCSS with plugins as default processor to provide most common set of
desired functionality without the overhead of `node-sass`.

Include customization hook that includes the current set of plugins and accepts
any array of plugins.

## Plugins

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

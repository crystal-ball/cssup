# Loader workflow

* Declare `cssup` in the JS file

1.  Babel plugin parses the file, and for each `cssup` declaration, the webpack
    loader is called with the `cssup` value.
1.  Babel plugin returns a function for determining class names.
1.  Babel plugin adds a file import for the CSS file.

1.  Loader creates a map of file imports to css chunks.
1.  When loader is called for that file path, chunk is referenced from the map.
1.  The CSS is returned from the loader.


# Loader workflow

Problem: We want to use multiple loaders with the CSS, including `css-loader`
and `style-loader` to handle loading assets and injecting styles into the DOM,
and to allow people to customize how their CSS is transformed. Using a plugin
doesn't make this simple.

#### Vue

Mirror the `vue-loader` ability to define a `.css` test/loader config, and call
that loader from the `cssup-loader`. Users would include the `cssup-loader` in
their `.js` loader chain, include the `CSSUp.Plugin`, and include a `.css`
loader chain.

Then we have to see how the `vue-loader` generates blocks and calls the other
loaders. _woof_
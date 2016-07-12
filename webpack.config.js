const webpack = require('webpack');
const makeWebpackConfig = require('hjs-webpack');

const config = makeWebpackConfig({
  in: 'src/app.js',
  out: 'public',
  clearBeforeBuild: true,

  replace: {
    config: './src/config.js'
  },

  html: function (context) {
    return {
      'index.html': `
        <!doctype html>
        <head>
          <meta charset="utf-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"/>
          <link rel="shortcut icon" href="/favicon.ico">
          <link rel="icon" href="/favicon.png">
          <link rel="stylesheet" href="https://www.herokucdn.com/purple/1.1.2/purple.min.css" />
          <link rel="stylesheet" href="/${context.css}"/>
          <title>Wish you were here!</title>
          <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>
        </head>
        <body><div id="root"></div></body>
        <script src="/${context.main}"></script>
      `
    };
  }
});

// Don't use url-loader for svg
config.module.loaders = config.module.loaders.map(function (l) {
  if (l.loader && l.loader.match(/url-loader/)) {
    l.test = new RegExp(l.test.source.replace('|svg', ''), l.test.flags);
  }

  return l;
});

config.module.loaders.push({
  test: /\.(svg)$/,
  loader: 'file-loader'
});

config.sassLoader = {
  includePaths: require('bourbon').includePaths
};

config.plugins = config.plugins || [];
config.plugins.push(
  new webpack.EnvironmentPlugin([
    'WYWH_API'
  ])
);

module.exports = config;

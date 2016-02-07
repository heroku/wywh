const Config = require('getconfig');
const makeWebpackConfig = require('hjs-webpack');

const config = makeWebpackConfig({
  in: 'src/app.js',
  out: 'public',
  clearBeforeBuild: true,

  replace: {
    config: Config.clientConfig
  },

  html: function (context) {
    return {
      'index.html': context.defaultTemplate({
        head: `
          <link rel="stylesheet" href="https://www.herokucdn.com/purple/1.1.2/purple.min.css" />
          <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>
        `
      })
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

module.exports = config;

var names = process.argv[2];
var emoji = require('./emoji.json');
var fs = require('fs');

if (!names) {
  console.log("You need to pass \":emoji::emoji2:...\" as the first argument on the command line");
  process.exit(1);
}

var results = [];

names = names.split(/:/).filter(function (n) { return !!n })

if (names.length < 1) {
  console.log("You need to pass \":emoji::emoji2:...\" as the first argument on the command line");
  process.exit(1);
}

names.map(function (name) {
  var unicode = emoji[name].unicode;
  if (fs.existsSync(__dirname + '/src/images/emoji/' + unicode + '.png')) {
    results.push("{ name: '" + name + "', src: require('./images/emoji/" + unicode + ".png') },");
  }
});

console.log(results.join('\n'));

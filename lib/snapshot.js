var page = require('webpage').create()
var system = require('system')

var url = system.args[1]
var filename = system.args[2]

console.log(url);
console.log(filename);

page.viewportSize = { width: 800, height: 600 };
page.open(url, function () {
    page.render(filename);
    phantom.exit();
});


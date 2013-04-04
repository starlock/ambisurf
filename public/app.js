require([
    "js/underscore",
    "js/class",
    "js/ambisurf"
], function(
    _,
    Class,
    App
) {
    var baseUrl = 'http://localhost:1337';
    this.ambisurf = new App(baseUrl);

});

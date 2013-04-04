require([
    "js/underscore",
    "js/class"
], function(
    _,
    Class
) {
    var App = Class.extend({
        init: function() {
            var self = this;
            $(function() {
                self.ready();
            });
        },

        ready: function() {
            console.log('Dom ready');
        }
    });

    this.ambisurf = new App();
});

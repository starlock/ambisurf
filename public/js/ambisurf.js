define(['js/underscore', 'js/Class'], function(_, Class) {
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
    return App;
});
define(['js/underscore', 'js/Class'], function(_, Class) {
    var App = Class.extend({
        baseUrl: undefined,     // baseUrl to screenshot service

        init: function(baseUrl) {
            var self = this;

            this.baseUrl = baseUrl;
            $(function() {
                self.ready();
            });
        },

        ready: function() {
            console.log('Dom ready');
        },

        setLightByUrl: function(url) {
            var image = this.getImage(url),
                canvas = this.getCanvasByImage(image),
                colors = this.getColorsFromCanvas(canvas);
        },

        getImageUrl: function(url) {
            return this.baseUrl + '/snapshot/?url=' + url;
        }.

        getImage: function(url) {
            var imgSrc = this.getImageUrl(url),
                image = $('<img>').attr('src', imgSrc);
            return image;
        },

        getCanvasByImage: function(image) {
            // TODO: create canvas
            var canvas = $('<canvas>');
            return canvas;
        },

        getColorsFromCanvas: function(canvas) {
            // TODO: get colors
            return [
            ];
        }
    });
    return App;
});

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
            var self = this,
                image = this.getImage(url);

            image.onload = function() {
                canvas = self.getCanvasByImage(image),
                colors = self.getColorsFromCanvas(canvas);
            };
        },

        getImageUrl: function(url) {
            return '/img/staticimg.png';
            //return this.baseUrl + '/snapshot/?url=' + url;
        },

        getImage: function(url) {
            var imgSrc = this.getImageUrl(url),
                image = new Image();
            image.src = imgSrc;
            return image;
        },

        getCanvasByImage: function(image) {
            var canvas = document.getElementById('viewport'),
                context = canvas.getContext('2d');
            canvas.height = image.height;
            canvas.width = image.width;
            context.drawImage(image, 0, 0);
            return canvas;
        },

        getColorsFromCanvas: function(canvas) {
            var context = canvas.getContext('2d'),
                imageData = context.getImageData(0, 0, 100, 100),
                pixels = imageData.data,
                colors = [],
                maxValue = 0,
                freq = {},
                result;
            for (var i = 0, o, r, g, b; i < pixels.length; i++) {
                var c = [pixels[i+0], pixels[i + 1], pixels[i + 2]];
                if (!(c.r > 250 && c.g > 250 && c.b > 250)) {
                    colors.push(c);
                }
            }

            for (var color in colors) {
                freq[colors[color]] = (freq[colors[color]] || 0) + 1;
                if (freq[colors[color]] > maxValue) {
                    maxValue = freq[colors[color]];
                    result = colors[color];
                }
            }

            return result;
        }
    });
    return App;
});

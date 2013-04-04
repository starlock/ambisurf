define([
    'js/underscore',
    'js/Class',
    'js/thumbnailer'
], function(
    _,
    Class,
    Thumbnailer
) {
    var App = Class.extend({
        baseUrl: undefined,     // baseUrl to screenshot service
        maxWidth: 200,

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
                var canvas = self.getCanvasByImage(image),
                    colors = self.getColorsFromCanvas(canvas),
                    hueColors = self.converToHue(colors);
            };
        },

        converToHue: function(colors) {
            var r = colors[0],
                g = colors[1],
                b = colors[2];
            r /= 255, g /= 255, b /= 255;
            var max = Math.max(r, g, b), min = Math.min(r, g, b);
            var h, s, l = (max + min) / 2;

            if(max == min){
                h = s = 0;
            } else {
                var d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch(max){
                    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                    case g: h = (b - r) / d + 2; break;
                    case b: h = (r - g) / d + 4; break;
                }
                h /= 6;
            }

            return [Math.floor(h * 360), Math.floor(s * 100), Math.floor(l * 100)];
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
            // Resize the image and put in the canvas
            new Thumbnailer(canvas, image, this.maxWidth, 3);
            return canvas;
        },

        getColorsFromCanvas: function(canvas) {
            var context = canvas.getContext('2d'),
                imageData = context.getImageData(0, 0, canvas.width, canvas.height),
                pixels = imageData.data,
                colors = [],
                maxValue = 0,
                freq = {},
                result;

            for (var i = 0, r, g, b; i < pixels.length; i += 4) {
                var c = [pixels[i + 0], pixels[i + 1], pixels[i + 2]];
                // Skip grey tones in palette
                if (!(c[0] > 200 && c[1] > 200 && c[2] > 200)) {
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

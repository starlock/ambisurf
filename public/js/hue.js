define([
], function(
) {
    var Hue = {};

    Hue.bridge_ip = "10.0.1.35";
    Hue.devicetype = "ambisurf";
    Hue.username = "newdeveloper";

    // Indexes of the lamp to control, totally hardcoded for now
    Hue.lightsToControl = ["4", "5"];

    // Remembers the states of each light seen
    Hue.lightStates = [];

    Hue.callBridge = function(type, method, args, success) {
        var url = "http://" + this.bridge_ip + "/" + method,
            ajaxArgs = {
                type: type,
                success: success,
                error: function(response) {
                    console.log("error:", response);
                },
                dataType: "json"
            };
        if (args) {
            ajaxArgs.data = JSON.stringify(args);
        }
        $.ajax(url, ajaxArgs);
    };

    Hue.authenticate = function(cb) {
        this.callBridge(
            "POST", "api", {
                username: this.username,
                devicetype: this.devicetype
            }, cb
        );
    };

    Hue.lights = function(cb) {
        var method = "api/" + this.username,
            args = false;

        this.callBridge("GET", method, args, cb);
    };

    Hue.changeColor = function(hue, saturation) {
        this.lights(function(data) {
            var lights = data.lights;
            $.each(lights, function(light, obj) {
                if (Hue.lightsToControl.indexOf(light) !== -1) {
                    Hue.lightStates[light] = obj.state;
                    Hue.changeLightColor(light, hue, saturation);
                }
            });
        });
    };

    Hue.blink = function() {
        this.lights(function(data) {
            var lights = data.lights;
            $.each(lights, function(light, obj) {
                if (Hue.lightsToControl.indexOf(light) !== -1) {
                    Hue.lightStates[light] = obj.state;
                    Hue.blinkLight(light);
                }
            });
        });
    };

    Hue.loopLight = function(light) {
        Hue.changeLightState(light, {on: true, effect: "colorloop"});
    };

    Hue.blinkLight = function(light) {
        var self = this,
            state = {};
        var currentState = Hue.lightStates[light];
        if (currentState.hue > 32000) {
            state.hue = Math.floor(Math.random() * 32000) + 1;
        } else {
            state.hue = Math.floor(Math.random() * 65000) + 32000;
        }

        state.on = true;
        state.transitiontime = 1;
        Hue.changeLightState(light, state, function(resp) {
            setTimeout(Hue.blinkLight, 25, light);
        });
    };

    Hue.changeLightColor = function(light, hue, saturation) {
        var state = {
            hue: hue,
            sat: saturation,
            transitiontime: 1,
            on: true
        };
        Hue.changeLightState(light, state);
    };

    Hue.changeLightState = function(id, state, cb) {
        var self = this,
            method = "api/" + this.username + "/lights/" + id + "/state",
            args = state;
        var callback = function(response) {
            Hue.lightStates[id] = state; // update remembered state
            if (typeof cb !== 'undefined') {
                cb(response);
            }
        };
        this.callBridge("PUT", method, args, callback);
    };

    return Hue;
});

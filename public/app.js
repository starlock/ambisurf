require([
    "js/underscore",
    "js/class",
    "js/ambisurf"
], function(
    _,
    Class,
    App
) {
    var baseUrl = window.location.href,
        ambisurf = new App(baseUrl);
    $('#form').on('submit', function(e) {
        e.preventDefault();
        var url = document.getElementById('url').value;
        ambisurf.setLightByUrl(url);
    });
});

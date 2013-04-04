require([
    "js/underscore",
    "js/class"
], function(
    _,
    Class
) {
    var Person = Class.extend({
      init: function(isDancing){
        this.dancing = isDancing;
      },
      dance: function(){
        console.log('dancing');
      }
    });
    console.log(new Person(true));
});

(function() {
  define([], function() {
    return {
      reverse: function(string) {
        return string.split('').reverse().join('');
      }
    };
  });

}).call(this);

function add() {
  var numList = [].slice.call(arguments);
  var _fn = function() {
    numList = numList.concat([].slice.call(arguments));
    return _fn;
  };
  _fn.valueOf = function() {
    return numList.reduce(function(i, j) {return i + j;});
  };
  return _fn;
}

add(1)(2)(3);
add(1)(2)(3,4,5);

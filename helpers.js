const H = (function(){
  return {
    loop: _loop,
    loopProps: function(obj, act) {
      _loop(Object.getOwnPropertyNames(obj), act);
    }
  };

  function _loop(list, act) {
    for (let i = 0, l = list.length; i < l; ++i) {
      let item = list[i];
      act(item);
    }
  }
})();
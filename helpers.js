const H = (function(){
  return {
    loop: _loop,
    loopProps: function(obj, act) {
      _loop(Object.getOwnPropertyNames(obj), act);
    },
    toComparableString: _toComparableString,
    propsToComparableString: function(obj) {
      return _toComparableString(Object.getOwnPropertyNames(obj));
    }
  };

  function _loop(list, act) {
    for (let i = 0, l = list.length; i < l; ++i) {
      let item = list[i];
      act(item);
    }
  }

  function _toComparableString(values) {
    let list = values.slice(0);
    list.sort();

    return list.join(',');
  }
})();
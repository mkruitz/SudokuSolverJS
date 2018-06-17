const H = {
  loop: function(list, act) {
    for(let i = 0, l = list.length; i < l; ++i) {
      let item = list[i];
      act(item);
    }
  }
};
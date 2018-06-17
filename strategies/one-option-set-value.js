function Strategy_OneOptionSetValue() {
  return {
    tickPerGroup: function(group) {
      loop(group, function(cell) {
        if(!Number.isNaN(cell.val)) {
          return;
        }

        const options = Object.getOwnPropertyNames(cell.opt);
        if(options.length === 1) {
          cell.val = parseInt(options[0], 10);
          cell.opt = {};
          cell.changed.val = true;
        }
      });
    }
  };

  function loop(group, act) {
    for(let i = 0, l = group.length; i < l; ++i) {
      let cell = group[i];
      act(cell);
    }
  }
}
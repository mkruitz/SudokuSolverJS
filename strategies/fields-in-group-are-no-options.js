function Strategy_FieldsInGroupAreNoOptions() {
  return {
    tickPerGroup: function(group) {
      const alreadyFoundValues = [];

      loop(group, function(cell) {
        if(!Number.isNaN(cell.val)) {
          alreadyFoundValues.push(cell.val);
        }
      });

      loop(group, function(cell) {
        if(!Number.isNaN(cell.val)) {
          return;
        }

        for(let i = 0, l = alreadyFoundValues.length; i < l; ++i) {
          if(cell.opt[alreadyFoundValues[i]]) {
            cell.changed.opt = true;
          }
          delete cell.opt[alreadyFoundValues[i]];
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
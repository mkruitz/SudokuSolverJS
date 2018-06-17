function Strategy_FieldsInGroupAreNoOptions() {
  return {
    tickPerGroup: function(group) {
      const alreadyFoundValues = [];

      H.loop(group, function(cell) {
        if(!Number.isNaN(cell.val)) {
          alreadyFoundValues.push(cell.val);
        }
      });

      H.loop(group, function(cell) {
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
}
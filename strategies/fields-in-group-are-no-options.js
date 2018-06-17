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

        S.removeOptionsFromCell(cell, alreadyFoundValues);
      });
    }
  };
}
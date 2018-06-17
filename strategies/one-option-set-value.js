function Strategy_OneOptionSetValue() {
  return {
    tickPerGroup: function(group) {
      H.loop(group, function(cell) {
        if(!Number.isNaN(cell.val)) {
          return;
        }

        const options = Object.getOwnPropertyNames(cell.opt);
        if(options.length === 1) {
          S.setCellValue(cell, options[0]);
        }
      });
    }
  };
}
function Strategy_OnlyOptionInGroup() {
  return {
    tickPerGroup: function(group) {
      const countOptions = { };
      const setValues = { };

      H.loop(group, function(cell) {
        if (!Number.isNaN(cell.val)) {
          setValues[cell.val]  = true;
          return;
        }

        const options = Object.getOwnPropertyNames(cell.opt);
        for (let i = 0, l = options.length; i < l; ++i) {
          let opt = options[i];
          let count = countOptions[opt] = countOptions[opt] || [];
          count.push(cell);
        }
      });

      H.loop(Object.getOwnPropertyNames(countOptions), function (opt) {
        let count = countOptions[opt];
        if(count.length === 1 && !setValues[opt]) {
          count[0].val = parseInt(opt, 10);
          count[0].opt = {};
          count[0].changed.val = true;
          count[0].changed.opt = true;
        }
      });
    }
  };
}
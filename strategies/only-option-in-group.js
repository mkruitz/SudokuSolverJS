function Strategy_OnlyOptionInGroup() {
  return {
    tick: function(group) {
      const countOptions = { };

      loop(group, function(cell) {
        if (!Number.isNaN(cell.val)) {
          return;
        }

        const options = Object.getOwnPropertyNames(cell.opt);
        for (let i = 0, l = options.length; i < l; ++i) {
          let opt = options[i];
          let count = countOptions[opt] = countOptions[opt] || [];
          count.push(cell);
        }
      });

      loop(Object.getOwnPropertyNames(countOptions), function (opt) {
        let count = countOptions[opt];
        if(count.length === 1) {
          count[0].val = parseInt(opt, 10);
          count[0].opt = {};
          count[0].changed.val = true;
          count[0].changed.opt = true;
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
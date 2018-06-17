function Strategy_OnlyOptionInGroup() {
  return {
    tickPerGroup: function(group) {
      const countOptions = S.countOptions(group);

      H.loop(Object.getOwnPropertyNames(countOptions.counts), function (opt) {
        let count = countOptions.counts[opt];
        if(count.length === 1 && !countOptions.setValues[opt]) {
          count[0].val = parseInt(opt, 10);
          count[0].opt = {};
          count[0].changed.val = true;
          count[0].changed.opt = true;
        }
      });
    }
  };
}
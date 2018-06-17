function Strategy_OnlyOptionInGroup() {
  return {
    tickPerGroup: function(group) {
      const countOptions = S.countOptions(group);

      H.loop(Object.getOwnPropertyNames(countOptions.counts), function (opt) {
        let count = countOptions.counts[opt];
        if(count.length === 1 && !countOptions.setValues[opt]) {
          S.setCellValue(count[0], opt);
        }
      });
    }
  };
}
function Strategy_OnlyOptionInGroup() {
  return {
    tickPerGroup: function(group) {
      const counts = S.countOptions(group);

      H.loop(Object.getOwnPropertyNames(counts), function (opt) {
        let count = counts[opt];
        if(count.length === 1) {
          S.setCellValue(count[0], opt);
        }
      });
    }
  };
}
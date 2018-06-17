function Strategy_IfMultipleOptionsInSameCellsThenRemoveOtherOptions(grid) {
  return {
    tick: function () {
      H.loop(grid.groups.area, function(area) {
        let counts = S.countOptions(area);

        let cellIds = groupOptionsByAllCells(counts);

        H.loopProps(cellIds, function(idsString) {
          let options = cellIds[idsString];
          let cells = counts[options[0]];
          if(options.length > 1 && options.length === cells.length) {
            H.loop(cells, function(cell){
              S.setOptionsFromCell(cell, options);
            });
          }
        });
      });
    }
  };

  function groupOptionsByAllCells(counts) {
    let cellIds = {};
    H.loopProps(counts, function(opt) {
      let ids = counts[opt].map(c => c.id);
      let idsString = H.toComparableString(ids);
      let cellId = cellIds[idsString] = cellIds[idsString] || [];
      cellId.push(opt);
    });

    return cellIds;
  }
}
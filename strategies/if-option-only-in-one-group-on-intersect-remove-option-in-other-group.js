function Strategy_IfOptionOnlyInOneGroupOnIntersectRemoveOptionInOtherGroup(grid) {
  return {
    tick: function() {
      H.loop(grid.intersects, function(intersect) {
        let intersectCounts = S.countOptions(intersect.intersect);
        let areaCounts = S.countOptions(intersect.area);
        let lineCounts = S.countOptions(intersect.line);

        H.loopProps(intersectCounts, function (opt) {
          let intersectCount = intersectCounts[opt];
          let areaCount = areaCounts[opt] || [];
          let lineCount = lineCounts[opt] || [];

          removeOptions(opt, intersectCount, areaCount, lineCount);
          removeOptions(opt, intersectCount, lineCount, areaCount);
        });
      });
    }
  };

  function removeOptions(opt, intersectCount, groupA, groupB) {
    if(intersectCount.length  === groupA.length) {
      let nonIntersecting = S.getNonIntersectingCells(intersectCount, groupB);
      let optionsToRemove = [opt];
      H.loop(nonIntersecting, function(cell) {
        S.removeOptionsFromCell(cell, optionsToRemove);
      });
    }
  }
}
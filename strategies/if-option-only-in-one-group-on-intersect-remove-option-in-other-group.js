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
          removeOptions(opt, intersectCount, areaCount, lineCount);
        });
      });
    }
  };

  function removeOptions(opt, intersectCount, groupA, groupB) {
    if(intersectCount.length  === groupA.length) {
      let nonIntersecting = getNonIntersectingCells(intersectCount, groupB);
      let optionsToRemove = [opt];
      H.loop(nonIntersecting, function(cell) {
        S.removeOptionsFromCell(cell, optionsToRemove);
      });
    }
  }

  function getNonIntersectingCells(intersect, group) {
    const nonIntersect = [];
    const intersectIds = {};

    H.loop(intersect, function(cell) {
      intersectIds[cell.id] = true;
    });

    for(let i = 0, l = group.length; i < l; ++i) {
      let cell = group[i];
      if(!intersectIds[cell.id]) {
        nonIntersect.push(cell);
      }
    }

    return nonIntersect;
  }
}
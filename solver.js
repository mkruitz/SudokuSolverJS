function Solver(grid) {
  const logicalGroups = [];
  const strategies = [
    new Strategy_FieldsInGroupAreNoOptions(),
    new Strategy_OnlyOptionInGroup(),
    new Strategy_OneOptionSetValue(),
    new Strategy_IfOptionOnlyInOneGroupOnIntersectRemoveOptionInOtherGroup(grid)
  ];
  let strategyIndex = 0;
  let changesCount = 0;

  logicalGroups.push(...grid.groups.hor);
  logicalGroups.push(...grid.groups.vert);
  logicalGroups.push(...grid.groups.area);

  return {
    tick: function() {
      clearChanges();

      runStrategy();
      selectNextStrategy();

      let changed = isChanged();
      changesCount += changed
        ? 1
        : -1;

      return {
        done: changesCount <= -strategies.length,
        isChanged: changed
      };
    }
  };

  function clearChanges() {
    H.loop(grid.groups.all, function(cell) {
      cell.changed.val = false;
      cell.changed.opt = false;
    });
  }

  function isChanged() {
    for(let i = 0, l = grid.groups.all.length; i < l; ++i) {
      let cell = grid.groups.all[i].changed;

      if(cell.val || cell.opt) {
        return true;
      }
    }
    return false;
  }

  function runStrategy() {
    let s = strategies[strategyIndex];
    if(s.tick) {
      s.tick();
    }
    if(s.tickPerGroup) {
      H.loop(logicalGroups, s.tickPerGroup);
    }
  }

  function selectNextStrategy() {
    strategyIndex = (strategyIndex + 1) % strategies.length;
  }
}
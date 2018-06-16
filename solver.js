function Solver(grid) {
  const logicalGroups = [];
  const strategies = [
    new Strategy_FieldsInGroupAreNoOptions(),
    new Strategy_OneOptionSetValue()
  ];

  logicalGroups.push(...grid.groups.hor);
  logicalGroups.push(...grid.groups.vert);
  logicalGroups.push(...grid.groups.area);

  return {
    tick: function() {
      console.log('tick');
      clearChanges();

      loop(logicalGroups, solveGroup);

      return isChanged();
    }
  };

  function clearChanges() {
    loop(grid.groups.all, function(cell) {
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

  function solveGroup(group) {
    loop(strategies, function(strategy) {
      strategy.tick(group);
    });
  }

  function loop(group, act) {
    for(let i = 0, l = group.length; i < l; ++i) {
      let cell = group[i];
      act(cell);
    }
  }
}
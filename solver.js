function Solver(grid) {
  const logicalGroups = [];
  let changed = false;

  logicalGroups.push(...grid.groups.hor);
  logicalGroups.push(...grid.groups.vert);
  logicalGroups.push(...grid.groups.area);

  return {
    tick: function() {
      console.log('tick');
      clearChanges();

      loop(logicalGroups, solveGroup);

      return changed;
    }
  };

  function clearChanges() {
    changed = false;

    loop(grid.groups.all, function(cell) {
      cell.changed.val = false;
      cell.changed.opt = false;
    });
  }

  function solveGroup(group) {
    const alreadyFoundValues = [];

    loop(group, function(cell) {
      if(!Number.isNaN(cell.val)) {
        alreadyFoundValues.push(cell.val);
      }
    });

    loop(group, function(cell) {
      if(!Number.isNaN(cell.val)) {
        return;
      }

      for(let i = 0, l = alreadyFoundValues.length; i < l; ++i) {
        if(cell.opt[alreadyFoundValues[i]]) {

          changed = true;
          cell.changed.opt = true;
        }
        delete cell.opt[alreadyFoundValues[i]];
      }

      const options = Object.getOwnPropertyNames(cell.opt);
      if(options.length === 1) {
        cell.val = parseInt(options[0], 10);
        cell.opt = {};

        changed = true;
        cell.changed.val = true;
      }
    });
  }

  function loop(group, act) {
    for(let i = 0, l = group.length; i < l; ++i) {
      let cell = group[i];
      act(cell);
    }
  }
}
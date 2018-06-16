function Solver(grid) {
  const solvers = [];

  addSolvers(grid.groups.hor);
  addSolvers(grid.groups.vert);
  addSolvers(grid.groups.area);

  return {
    tick: function() {
      console.log('tick');
      clearChanges();

      for(let i = 0, l = solvers.length; i < l; ++i) {
        solvers[i]();
      }

      return true;
    }
  };

  function clearChanges() {
    loopGroup(grid.groups.all, function(cell) {
      cell.changed.val = false;
      cell.changed.opt = false;
    });
  }

  function addSolvers(groups) {
    for(let i = 0, l = groups.length; i < l; ++i) {
      let s = function(i) {
        return function() { solveGroup(groups[i]); };
      }(i);
      solvers.push(s);
    }
  }

  function solveGroup(group) {
    const alreadyFoundValues = [];

    loopGroup(group, function(cell) {
      if(!Number.isNaN(cell.val)) {
        alreadyFoundValues.push(cell.val);
      }
    });

    loopGroup(group, function(cell) {
      if(!Number.isNaN(cell.val)) {
        return;
      }

      for(let i = 0, l = alreadyFoundValues.length; i < l; ++i) {
        if(cell.opt[alreadyFoundValues[i]]) {
          cell.changed.opt = true;
        }
        delete cell.opt[alreadyFoundValues[i]];
      }

      const options = Object.getOwnPropertyNames(cell.opt);
      if(options.length === 1) {
        cell.val = parseInt(options[0], 10);
        cell.opt = {};
        cell.changed.val = true;
      }
    });
  }

  function loopGroup(group, act) {
    for(let i = 0, l = group.length; i < l; ++i) {
      let cell = group[i];
      act(cell);
    }
  }
}
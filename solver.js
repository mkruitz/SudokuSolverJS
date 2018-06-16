function Solver(grid) {
  var solvers = [];

  addSolvers(grid.groups.hor);
  addSolvers(grid.groups.vert);
  addSolvers(grid.groups.area);

  return {
    tick: function() {
      console.log('tick');

      for(var i = 0, l = solvers.length; i < l; ++i) {
        solvers[i]();
      }

      return true;
    }
  };

  function addSolvers(groups) {
    for(var i = 0, l = groups.length; i < l; ++i) {
      var s = function(i) {
        return function() { solveGroup(groups[i]); };
      }(i);
      solvers.push(s);
    }
  }

  function solveGroup(group) {
    var alreadyFoundValues = [];

    loopGroup(group, function(cell) {
      if(!Number.isNaN(cell.val)) {
        alreadyFoundValues.push(cell.val);
      }
    });

    loopGroup(group, function(cell) {
      if(!Number.isNaN(cell.val)) {
        return;
      }

      for(var i = 0, l = alreadyFoundValues.length; i < l; ++i) {
        delete cell.opt[alreadyFoundValues[i]];
      }

      var options = Object.getOwnPropertyNames(cell.opt);
      if(options.length == 1) {
        cell.val = parseInt(options[0], 10);
        cell.opt = {};
      }
    });
  }

  function loopGroup(group, act) {
    for(var i = 0, l = grid.size; i < l; ++i) {
      var cell = group[i];
      act(cell);
    }
  }
}
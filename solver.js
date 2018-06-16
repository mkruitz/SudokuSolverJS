function Solver(grid) {
  var solvers = [];

  addSolvers(getHorizontalGroups());
  addSolvers(getVerticalGroups());
  addSolvers(getAreaGroups());

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

  function getHorizontalGroups() {
    var groups = [];
    for(var i = 0, l = grid.size; i < l; ++i) {
      groups.push(grid.cells[i]);
    }
    return groups;
  }

  function getVerticalGroups() {
    var groups = [];
    for(var i = 0, l = grid.size; i < l; ++i) {
      var group = [];
      for(var j = 0, jl = grid.size; j < jl; ++j) {
        group.push(grid.cells[j][i]);
      }
      groups.push(group);
    }
    return groups;
  }

  function getAreaGroups() {
    var size = Math.pow(grid.size, 1/2);
    if(size !== Math.floor(size)) {
      return [];
    }

    var groups = [];
    for(var i = 0, l = size; i < l; ++i) {
      for(var j = 0, jl = size; j < jl; ++j) {
        groups.push(getAreaGroup(size, i * size, j * size));
      }
    }
    return groups;
  }

  function getAreaGroup(size, iStart, jStart) {
    var groups = [];
    for(var i = 0, l = size; i < l; ++i) {
      for(var j = 0, jl = size; j < jl; ++j) {
        groups.push(grid.cells[j+jStart][i+iStart]);
      }
    }
    return groups;
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
function Grid(text, size) {
  text = text || '';
  size = size || 9;
  var cells = toGrid(text);
  return {
    cells: cells,
    size: size,
    groups: {
      hor: getHorizontalGroups(),
      vert: getVerticalGroups(),
      area: getAreaGroups()
    }
  };

  function toGrid(text) {
    var rows = [];
    var lines = text.split('\n');

    for(var i = 0, l = size; i < l; ++i) {
      var line = lines[i] || '';
      rows.push(toRow(line, size));
    }

    return rows;
  }

  function toRow(line) {
    var row = [];

    for (var i = 0, l = size; i < l; ++i) {
      var val = parseInt(line[i], 10);
      row.push(toCell(val));
    }
    return row;
  }


  function toCell(val) {
    var options = {};
    for(var i = 1, l = size + 1; i < l; ++i) {
      options[i] = true;
    }

    return Number.isNaN(val)
      ? { val: val, opt: options }
      : { val: val, opt: {} };
  }

  function getHorizontalGroups() {
    var groups = [];
    for(var i = 0, l = size; i < l; ++i) {
      groups.push(cells[i]);
    }
    return groups;
  }

  function getVerticalGroups() {
    var groups = [];
    for(var i = 0, l = size; i < l; ++i) {
      var group = [];
      for(var j = 0, jl = size; j < jl; ++j) {
        group.push(cells[j][i]);
      }
      groups.push(group);
    }
    return groups;
  }

  function getAreaGroups() {
    var areaSize = Math.pow(size, 1/2);
    if(areaSize !== Math.floor(areaSize)) {
      return [];
    }

    var groups = [];
    for(var i = 0, l = areaSize; i < l; ++i) {
      for(var j = 0, jl = areaSize; j < jl; ++j) {
        groups.push(getAreaGroup(areaSize, i * areaSize, j * areaSize));
      }
    }
    return groups;
  }

  function getAreaGroup(areaSize, iStart, jStart) {
    var groups = [];
    for(var i = 0, l = areaSize; i < l; ++i) {
      for(var j = 0, jl = areaSize; j < jl; ++j) {
        groups.push(cells[j+jStart][i+iStart]);
      }
    }
    return groups;
  }
}
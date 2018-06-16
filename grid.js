function Grid(text, size) {
  text = text || '';
  size = size || 9;
  const cells = toGrid(text);
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
    let rows = [];
    const lines = text.split('\n');

    for(let i = 0, l = size; i < l; ++i) {
      let line = lines[i] || '';
      rows.push(toRow(line, size));
    }

    return rows;
  }

  function toRow(line) {
    let row = [];

    for (let i = 0, l = size; i < l; ++i) {
      let val = parseInt(line[i], 10);
      row.push(toCell(val));
    }
    return row;
  }


  function toCell(val) {
    const options = {};
    for(let i = 1, l = size + 1; i < l; ++i) {
      options[i] = true;
    }

    return Number.isNaN(val)
      ? { val: val, opt: options }
      : { val: val, opt: {} };
  }

  function getHorizontalGroups() {
    const groups = [];
    for(let i = 0, l = size; i < l; ++i) {
      groups.push(cells[i]);
    }
    return groups;
  }

  function getVerticalGroups() {
    const groups = [];
    for(let i = 0, l = size; i < l; ++i) {
      let group = [];
      for(let j = 0, jl = size; j < jl; ++j) {
        group.push(cells[j][i]);
      }
      groups.push(group);
    }
    return groups;
  }

  function getAreaGroups() {
    const areaSize = Math.pow(size, 1/2);
    if(areaSize !== Math.floor(areaSize)) {
      return [];
    }

    const groups = [];
    for(let i = 0, l = areaSize; i < l; ++i) {
      for(let j = 0, jl = areaSize; j < jl; ++j) {
        groups.push(getAreaGroup(areaSize, i * areaSize, j * areaSize));
      }
    }
    return groups;
  }

  function getAreaGroup(areaSize, iStart, jStart) {
    const groups = [];
    for(let i = 0, l = areaSize; i < l; ++i) {
      for(let j = 0, jl = areaSize; j < jl; ++j) {
        groups.push(cells[j+jStart][i+iStart]);
      }
    }
    return groups;
  }
}
function Grid(text, size) {
  text = text || '';
  size = size || 9;
  let cellIndex = 0;
  const cells = toGrid(text);
  const areas = getAreaGroups();
  const horizontalLines = getHorizontalGroups();
  const verticalLines = getVerticalGroups();
  return {
    cells: cells,
    size: size,
    groups: {
      hor: horizontalLines,
      vert: verticalLines,
      area: areas,
      all: getAreaGroup(size, 0, 0)
    },
    intersects: getAreaIntersects()
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
    cellIndex++;
    return {
      id: cellIndex,
      val: val,
      opt: getOptions(val),
      changed: {
        val: false,
        opt: false
      }
    };
  }

  function getOptions(val) {
    const options = {};
    for(let i = 1, l = size + 1; i < l; ++i) {
      options[i] = true;
    }

    return Number.isNaN(val)
      ? options
      : {};
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

  function getAreaIntersects() {
    const areaSize = Math.pow(size, 1/2);
    if(areaSize !== Math.floor(areaSize)) {
      return [];
    }

    return [
      ...getHorizontalAreaIntersects(areaSize),
      ...getVerticalAreaIntersects(areaSize)
    ];
  }

  function getHorizontalAreaIntersects(areaSize) {
    return getAreaLineIntersects(
      areaSize,
      horizontalLines,
      function (i, j) { return j * areaSize + i; }
    );
  }

  function getVerticalAreaIntersects(areaSize) {
    return getAreaLineIntersects(
      areaSize,
      verticalLines,
      function (i, j) { return i * areaSize + j; }
    );
  }

  function getAreaLineIntersects(areaSize, lines, indexFunc) {
    const intersects = [];
    loop(areas, function (area) {
      for (let i = 0, l = areaSize; i < l; ++i) {
        let intersect = [];
        for (let j = 0, jl =  areaSize; j < jl; ++j) {
          let cell = area[indexFunc(i, j)];
          intersect.push(cell);
        }
        intersects.push({
          intersect: intersect,
          area: area,
          line: getLineContainingCell(lines, intersect[0])
        });
      }
    });

    return intersects;
  }

  function getLineContainingCell(lines, cell) {
    for(let i = 0, l = lines.length; i < l; ++i) {
      let line = lines[i];
      for(let j = 0, jl = line.length; j < jl; ++j) {
        if(line[j].id === cell.id) {
          return line;
        }
      }
    }
    throw 'Cell with id \'' + cell.id + '\' not found.';
  }

  function loop(group, act) {
    for(let i = 0, l = group.length; i < l; ++i) {
      let cell = group[i];
      act(cell);
    }
  }
}
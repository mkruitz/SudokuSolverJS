function Grid(text, size) {
  text = text || '';
  size = size || 9;
  return { cells: toGrid(text), size: size };

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
}
function Printer() {
  return {
    print: function(grid) {
      console.log(grid);

      var gridElm = newElm('grid', function(elm){
        elm.style = 'width: ' + grid.size + 'em; height: ' + grid.size + 'em;';
      });
      for(var i = 0, l = grid.size; i < l; ++i) {
        for(var j = 0, jl = grid.size; j < jl; ++j) {
          var cell = grid.cells[i][j];
          gridElm.appendChild(
            newElm('cell',
              newElm('body', function(elm) {
                elm.innerText = getCellValue(cell);
              }),
              newElm('hints', function(elm) {
                elm.innerText = getHints(cell);
              })
            )
          );
        }
      }
      return gridElm;
    }
  };

  function getCellValue(cell) {
    if(Number.isNaN(cell.val)) {
      return 'X';
    }
    return cell.val;
  }

  function getHints(cell) {
    var options = Object.getOwnPropertyNames(cell.opt);
    return options.join(', ');
  }

  function newElm(className) {
    var elm = document.createElement('div');
    elm.className = className;
    for(var i = 1, l = arguments.length; i < l; ++i) {
      var arg = arguments[i];
      if(typeof(arg) === 'function') {
        arg(elm);
      }
      else {
        elm.appendChild(arg);
      }
    }
    return elm;
  }
}
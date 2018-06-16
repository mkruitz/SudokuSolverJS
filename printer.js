function Printer() {
  return {
    print: function(grid) {
      console.log(grid);

      const gridElm = newElm('grid', function(elm){
        elm.classList.add('size-' + grid.size);
        elm.style = 'width: ' + grid.size + 'em; height: ' + grid.size + 'em;';
      });
      for(let i = 0, l = grid.size; i < l; ++i) {
        for(let j = 0, jl = grid.size; j < jl; ++j) {
          let cell = grid.cells[i][j];
          gridElm.appendChild(
            newElm('cell',
              newElm('body', function(elm) {
                if(cell.changed.val) {
                  elm.classList.add('changed');
                }
                elm.innerText = getCellValue(cell);
              }),
              newElm('hints', function(elm) {
                if(cell.changed.opt) {
                  elm.classList.add('changed');
                }
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
      return '';
    }
    return cell.val;
  }

  function getHints(cell) {
    const options = Object.getOwnPropertyNames(cell.opt);
    return options.length
      ? options.join(', ') + '.'
      : '';
  }

  function newElm(className) {
    const elm = document.createElement('div');
    elm.className = className;
    for(let i = 1, l = arguments.length; i < l; ++i) {
      let arg = arguments[i];
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
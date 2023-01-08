import { GridBox, GridBoxObject } from "./main";
import { getGridBolck } from "./GridComponent";
function getPositons() {
  let card = document.getElementsByClassName(`Focus`)[0];
  if (!!card) {
    let cardId = card.getAttribute("id");
    let pos = cardId.split("-");
    return [parseInt(pos[1]), parseInt(pos[2])];
  }
  return [null, null];
}

function leftNavigation(card) {
  let pos = getPositons();
  if (pos[1] != 0) {
    addFocus(pos[0], pos[1] - 1);
  } else if (pos[0] != 0) {
    addFocus(pos[0] - 1, GridBox[0].length - 1);
  }
}

function downNavigation(card) {
  let pos = getPositons();
  if (pos[0] != GridBox.length - 1) {
    addFocus(pos[0] + 1, pos[1]);
  }
}

function upNavigation(card) {
  let pos = getPositons();
  if (pos[0] != 0) {
    addFocus(pos[0] - 1, pos[1]);
  }
}

function rightNavigation(card) {
  let pos = getPositons();
  if (pos[1] != GridBox[0].length - 1) {
    addFocus(pos[0], pos[1] + 1);
  } else if (pos[0] != GridBox.length - 1 && pos[1] == GridBox[0].length - 1) {
    addFocus(pos[0] + 1, 0);
  }
}

function addFocus(row, col) {
  if (GridBox[row][col] != null) {
    let currentPositions = getPositons();
    let newPositions = [row, col];
    GridBox[currentPositions[0]][currentPositions[1]].removeClass("Focus");
    GridBox[newPositions[0]][newPositions[1]].addClass("Focus");
  }
}

export function Gridnavigation(direction) {
  let card = document.getElementsByClassName(`Focus`)[0];
  switch (direction) {
    case "Left":
      leftNavigation(card);
      break;
    case "Up":
      upNavigation(card);
      break;
    case "Down":
      downNavigation(card);
      break;
    case "Right":
      rightNavigation(card);
      break;
    default:
      break;
  }
}

export function removeBox(row, col) {
  updateIdsandGrid(row, col);
}

function updateIdsandGrid(row, col) {
  let rowstart = row;
  let colstart = col;
  let rowEnd = GridBox.length - 1;
  let colEnd = GridBox[0].length - 1;
  let firstpart = [];
  let secondpart = [];
  while (rowstart <= rowEnd) {
    if (rowstart != rowEnd || colstart < colEnd) {
      // console.log(GridBox[rowstart][colstart]);
      // console.log(GridBox[rowEnd][colEnd]);
      firstpart.push({ row: rowstart, col: colstart });
      secondpart.push({ row: rowEnd, col: colEnd });
    } else if (rowstart == rowEnd && colstart == colEnd) {
      firstpart.push({ row: rowstart, col: colstart });
      break;
    } else {
      break;
    }

    colstart += 1;
    colEnd -= 1;

    if (colstart == GridBox[0].length) {
      rowstart += 1;
      colstart = 0;
    }

    if (colEnd < 0) {
      rowEnd -= 1;
      colEnd = GridBox[0].length - 1;
    }
    // console.log('---------------------------')
  }

  for (let i = secondpart.length - 1; i >= 0; i--) {
    firstpart.push(secondpart[i]);
  }

  // console.log(firstpart);
  updateGrid(firstpart);
}

function updateGrid(Ids) {
  let prevId = `box-${Ids[0].row}-${Ids[0].col}`;
  let isFocused = false;
  if (GridBox[Ids[0].row][Ids[0].col].hasClass("Focus")) {
    isFocused = true;
  }
  GridBox[Ids[0].row][Ids[0].col].remove();
  GridBox[Ids[0].row][Ids[0].col] = null;

  if (Ids.length > 1) {
    for (let i = 0; i < Ids.length - 1; i++) {
      if (GridBox[Ids[i + 1].row][Ids[i + 1].col] === null) {
        GridBoxObject.setnullIndex([Ids[i].row, Ids[i].col]);
        break;
      }

      let temp = GridBox[Ids[i].row][Ids[i].col];
      GridBox[Ids[i].row][Ids[i].col] = GridBox[Ids[i + 1].row][Ids[i + 1].col];
      GridBox[Ids[i].row][Ids[i].col].setAttributes({
        id: `box-${Ids[i].row}-${Ids[i].col}`,
      });
      GridBox[Ids[i].row][Ids[i].col].updatechildElemetattribute({
        id: `close-${Ids[i].row}-${Ids[i].col}`,
      });

      GridBox[Ids[i + 1].row][Ids[i + 1].col] = temp;
      if (i + 1 == Ids.length - 1) {
        GridBoxObject.setnullIndex([Ids[i + 1].row, Ids[i + 1].col]);
      }
    }

    if (isFocused) {
      if (GridBox[Ids[0].row][Ids[0].col]) {
        GridBox[Ids[0].row][Ids[0].col].addClass("Focus");
      } else {
        let row = Ids[0].row;
        let col = Ids[0].col;
        while (row >= 0 || col >= 0) {
          if (GridBox[row][col] != null) {
            GridBox[row][col].addClass("Focus");
            break;
          } else {
            col -= 1;
            if (col < 0) {
              row -= 1;
              if (GridBox[0][0] != null) col = GridBox[0].length - 1;
            }
          }
        }
      }
    }
  } else {
    GridBoxObject.setnullIndex([Ids[0].row, Ids[0].col]);
  }
}

export function generateData(rows, cols) {
  let row_data = GridBox.length;
  let data = [];
  let tempdata = [];
  for (let i = 0; i < rows * cols; i++) {
    let row = row_data;
    let col = tempdata.length === 0 ? 0 : tempdata.length;
    data.push(getGridBolck(row, col));
    tempdata.push({ row, col });
    if (tempdata.length == cols) {
      tempdata = [];
      row_data += 1;
    }
  }
  return data;
}

export function renderGrid(component, Indexs) {
  if (Indexs === null) Indexs = [0, 0];
  let [row, col] = Indexs;
  console.log(Indexs);
  for (let i = row; i < GridBox.length; i++) {
    for (let j = col; j < GridBox[i].length; j++) {
      if (GridBox[i][j] === null) break;
      component.append(GridBox[i][j].getHtmlBolck());
    }
    col = 0;
  }
  let height = 55 * GridBox.length;
  let width = 55 * GridBox[0].length;
  let attributes = {
    style: `height:${height}px;width:${width}px`,
  };
  component.setAttributes(attributes);
}

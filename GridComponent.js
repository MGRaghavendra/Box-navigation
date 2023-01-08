import { closeButton, GridBolck, GridContainer } from "./components";
import { removeBox } from "./actions";
import { GridBox, GridBoxObject } from "./main";

let app = document.querySelector("#app");
let GridContainerObject = null;
const getCloseButton = (row, col) => {
  let innerHTML = `<div class=closeButton></div>`;
  let attributes = {
    id: `close-${row}-${col}`,
    class: "closeBox",
  };
  const Button = new closeButton(attributes, innerHTML);

  Button.addEventListener("click", function (e) {
    let Id = this.getAttribute("id");
    let Idsplids = Id.split("-");
    removeBox(parseInt(Idsplids[1]), parseInt(Idsplids[2]));
  });

  return Button;
};

export const getGridBolck = (row, col) => {
  let innerHTML = `{${row},${col}}`;
  let attributes = {
    id: `box-${row}-${col}`,
    class: "box",
  };
  let CloseButton = getCloseButton(row, col);
  let GridBolckObject = new GridBolck(attributes, innerHTML, CloseButton);
  return GridBolckObject;
};

const getGridrow = (rowNum, rowData) => {
  let Row = [];
  for (let i = 0; i < rowData.length; i++) {
    let GridBolckObject = getGridBolck(rowNum, i);
    Row.push(GridBolckObject);
  }
  return Row;
};

const getGridrows = (Grid) => {
  let rows = [];
  for (let i = 0; i < Grid.length; i++) {
    rows.push(getGridrow(i, Grid[i]));
  }
  return rows;
};

const gridTemplate = (GridBox) => {
  if (GridBox.length == 0) return;
  let height = 55 * GridBox.length;
  let width = 55 * GridBox[0].length;
  let attributes = {
    class: `grid_box`,
    style: `height:${height}px;width:${width}px`,
  };

  GridContainerObject = new GridContainer(attributes);
  GridBoxObject.setComponent(GridContainerObject);
  let GridContainerHTML = GridContainerObject.getHtmlGridBox();
  let rows = getGridrows(GridBox);

  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].length; j++) {
      GridContainerHTML.append(rows[i][j].getHtmlBolck());
      GridBox[i][j] = rows[i][j];
    }
  }

  GridBox[0][0].addClass("Focus");
  return GridContainerHTML;
};

export function renderGridComponent(GridBox) {
  let gridHTML = gridTemplate(GridBox);
  let gridContainer = document.getElementsByClassName("grid_box");
  if (gridContainer.length > 0) {
    gridContainer[0].remove();
  }
  app.append(gridHTML);
}

export { GridContainerObject };

import "./style.css";
import javascriptLogo from "./javascript.svg";
import { Gridnavigation, generateData, renderGrid } from "./actions";
import Grid from "./grid.js";
import { renderGridComponent, getGridBolck } from "./GridComponent";

document.querySelector("#app").innerHTML = `
<div class=inputcontainer>
  <div class=inputbox>
   <label for=rows>rows</label>
   <input type=number name=rows id=rowInput value="5"/>
  </div>
   <div class=inputbox>
   <label for=cols>colums</label>
   <input type=number name=cols id=colInput value="5"/>
  </div>
   <div class=inputbox>
   <label for=pagination>pagination</label>
   <input type=number name=pagination id=pagination value="1"/>
  </div>
  <div class=btnbox>
  <div class=btn id=renderGrid>display</div>
  <div class=btn id=addData>Add</div>

  </div>
</div>
`;

let btn = document.querySelector("#renderGrid");
let rows = document.querySelector("#rowInput");
let cols = document.querySelector("#colInput");
let addbtn = document.querySelector("#addData");
let pagination = document.querySelector("#pagination");
let GridBoxObject = null;
let GridBox = [];

btn.addEventListener("click", function (e) {
  e.preventDefault();
  if (rows.value >= 0 && cols.value >= 0) {
    GridBoxObject = new Grid(rows.value, cols.value);
    GridBox = GridBoxObject.getGrid();
    renderGridComponent(GridBox);
  }
});

addbtn.addEventListener("click", function (e) {
  e.preventDefault();
  console.log(pagination.value);
  let data = generateData(parseInt(pagination.value), GridBox[0].length);
  GridBoxObject.addData(data, parseInt(pagination.value));
  GridBoxObject.updateComponent(renderGrid);
});

let keyCodes = {
  37: "Left",
  38: "Up",
  39: "Right",
  40: "Down",
};

window.addEventListener("keydown", function (e) {
  Gridnavigation(keyCodes[e.keyCode]);
});

window.onload = function () {
  GridBoxObject = new Grid(5, 5);
  GridBox = GridBoxObject.getGrid();
  renderGridComponent(GridBox);
};

export { GridBox, GridBoxObject };

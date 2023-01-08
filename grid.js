export default class createGrid {
  constructor(row, col) {
    this.grid = [];
    this.rows = row;
    this.cols = col;
    this.nullIndex = null;
    this.renderIndex = null;
    this.component = null;
    this.getGrid = this.getGrid.bind(this);
    this.setnullIndex = this.setnullIndex.bind(this);
    this.getDimensions = this.getDimensions.bind(this);
    this.setDimensions = this.setDimensions.bind(this);
    this.setComponent = this.setComponent.bind(this);
    this.addData = this.addData.bind(this);
    for (let i = 0; i < row; i++) {
      let row = [];
      for (let j = 0; j < col; j++) {
        row.push(null);
      }
      this.grid.push(row);
    }
    this.setnullIndex([this.grid.length, 0]);
  }
  getGrid() {
    return this.grid;
  }

  setnullIndex(Index) {
    this.renderIndex = this.nullIndex;
    if (!Index) this.nullIndex = null;
    else this.nullIndex = Index;
  }

  addData(data, nrows) {
    let row, col;
    if (this.nullIndex == null) {
      row = this.rows;
      col = 0;
    } else {
      row = this.nullIndex[0];
      col = this.nullIndex[1];
    }
    let i = 0;
    if (col > 0) {
      while (col < this.cols) {
        this.grid[row][col] = data[i];
        this.grid[row][col].setAttributes({
          id: `box-${row}-${col}`,
        });
        this.grid[row][col].updatechildElemetattribute({
          id: `close-${row}-${col}`,
        });
        i += 1;
        col += 1;
      }
      row += 1;
    }
    col = 0;
    while (i < data.length) {
      if (this.grid[row] === undefined) {
        this.grid[row] = [];
      }
      this.grid[row][col] = data[i];

      this.grid[row][col].setAttributes({
        id: `box-${row}-${col}`,
      });
      this.grid[row][col].updatechildElemetattribute({
        id: `close-${row}-${col}`,
      });

      col = col + 1;
      if (col === this.cols) {
        col = 0;
        row += 1;
      }
      i = i + 1;
    }

    this.setDimensions(this.grid.length, this.cols);

    if (
      row < this.rows &&
      col < this.cols &&
      (this.grid[this.rows - 1].length !== this.cols ||
        this.grid[row][col] === null)
    ) {
      this.setnullIndex([row, col]);
      while (row < this.rows && col < this.cols) {
        this.grid[row][col] = null;
        col = col + 1;
        if (col == this.col) {
          col = 0;
          row = row + 1;
        }
      }
    } else {
      this.setnullIndex(null);
    }

    console.log(this.grid);
  }

  getDimensions() {
    return [this.rows, this.cols];
  }

  setDimensions(rows, cols) {
    this.rows = rows;
    this.cols = cols;
  }

  setComponent(component) {
    this.component = component;
  }

  updateComponent(renderLogic) {
    renderLogic(this.component, this.renderIndex);
  }
}

class createDivElement {
  constructor(attributes, strHtml) {
    this.element = "";
    this.strHtml = strHtml;
    this.attributes = attributes;
    this.createElement = this.createElement.bind(this);
    this.addEventListener = this.addEventListener.bind(this);
    this.setAttributes = this.setAttributes.bind(this);
    this.getHTML = this.getHTML.bind(this);
    this.append = this.append.bind(this);
    this.getChildrenLength = this.getChildrenLength.bind(this);
    this.createElement();
    this.classList = [];
  }

  createElement() {
    let div = document.createElement("div");
    if (!!this.strHtml) div.innerHTML = this.strHtml;
    this.element = div;
    this.setAttributes(this.attributes);
  }

  setAttributes(attributes) {
    let attrkeys = Object.keys(attributes);
    for (let i = 0; i < attrkeys.length; i++) {
      this.element.setAttribute(attrkeys[i], attributes[attrkeys[i]]);
      if (attrkeys[i] == "class") {
        this.classList = [...attributes[attrkeys[i]].split(" ")];
      } else {
        this.attributes[attrkeys[i]] = attributes[attrkeys[i]];
      }
    }
  }

  getAttribute(attr) {
    return this.attributes[attr];
  }

  addEventListener(eventname, callback) {
    this.element.addEventListener(eventname, callback.bind(this));
  }

  addClass(cls) {
    this.element.classList.add(cls);
    this.classList = [...this.classList, ...cls.split(" ")];
  }

  hasClass(cls) {
    for (let i = 0; i < this.classList.length; i++) {
      if (this.classList[i] === cls) return true;
    }
    return false;
  }

  removeClass(cls) {
    this.classList = this.classList.filter((classname) => classname != cls);
    this.element.classList.remove(cls);
  }

  append(Node) {
    if (!!Node) this.element.append(Node);
    else throw new Error("appending Error");
  }

  remove() {
    this.element.remove();
  }

  getChildrenLength() {
    return this.element.children.length;
  }

  getHTML() {
    return this.element;
  }
}

export class closeButton extends createDivElement {
  constructor(attributes, strHtml) {
    super(attributes, strHtml);
    this.getHtmlButton = this.getHtmlButton.bind(this);
  }
  getHtmlButton() {
    return this.getHTML();
  }
}

export class GridBolck extends createDivElement {
  constructor(attributes, strHtml, children) {
    super(attributes, strHtml);
    this.getHtmlBolck = this.getHtmlBolck.bind(this);
    this.appendChildrens = this.appendChildren.bind(this);
    this.children = children;
    this.appendChildrens();
  }

  getHtmlBolck() {
    return this.getHTML();
  }

  appendChildren() {
    this.append(this.children.getHtmlButton());
  }

  updatechildElemetattribute(attributes) {
    this.children.setAttributes(attributes);
  }
}

export class GridContainer extends createDivElement {
  constructor(attributes, strHtml) {
    super(attributes, strHtml);
    this.getHtmlGridBox = this.getHtmlGridBox.bind(this);
  }
  getHtmlGridBox() {
    return this.getHTML();
  }
}

class Subject {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter((ob) => ob !== observer);
  }

  notify(data) {
    this.observers.forEach((ob) => ob.refresh(data));
  }
}

class ItemSubject extends Subject {
  constructor() {
    super();
    this.data = [];
  }

  add(item) {
    this.data.push(item);
    this.notify(this.data);
  }
}

class HtmlElementObserver {
  constructor(element) {
    this.element = element;
  }

  refresh(data) {
    this.element.innerHTML = data.reduce((acc, el) => {
      return acc + `<p>${el}</p>`;
    }, "");
  }
}

class Observer {
  constructor(fn) {
    this.fn = fn;
  }
  refresh(data) {
    this.fn(data);
  }
}

const item = new ItemSubject();
const div1Observer = new HtmlElementObserver(div1);
item.subscribe(div1Observer);
const div2Observer = new HtmlElementObserver(div2);
item.subscribe(div2Observer);
const div3Observer = new Observer((data) => {
  div3.innerHTML = data.length;
});
item.subscribe(div3Observer);

const add = () => {
  const name = txtName.value;
  item.add(name);
};

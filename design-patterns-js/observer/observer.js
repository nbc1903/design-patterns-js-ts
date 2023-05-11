/*
 * Used to make a subject notify observers that an action has been triggered.
 * This is a behavior design pattern
 */

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

class Observer {
  constructor(fn) {
    this.fn = fn;
  }
  refresh(data) {
    this.fn(data);
  }
}

const subject = new Subject();
const observer1 = new Observer((d) => console.log("Observer 1 with data: ", d));
subject.subscribe(observer1);
const observer2 = new Observer((d) => (div1.innerHTML = d));
subject.subscribe(observer2);
const observer3 = new Observer(
  (d) => (div2.innerHTML = d.split("").reverse().join(""))
);
subject.subscribe(observer3);
subject.unsubscribe(observer1);

const change = () => {
  subject.notify(myText.value);
};

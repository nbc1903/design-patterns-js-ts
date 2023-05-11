/*
 * Using Generics to assign a type when instantiating the class
 */

interface IObserver<T> {
  refresh(value: T): void;
}

interface ISubject<T> {
  observers: IObserver<T>[];

  subscribe(observer: IObserver<T>): void;
  unsubscribe(observer: IObserver<T>): void;
  notify(value: T): void;
}

class SubjectTS<T> implements ISubject<T> {
  observers: IObserver<T>[];

  constructor() {
    this.observers = [];
  }
  subscribe(observer: IObserver<T>): void {
    this.observers.push(observer);
  }
  unsubscribe(observer: IObserver<T>): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }
  notify(value: T): void {
    this.observers.forEach((observer) => observer.refresh(value));
  }
}

class ObserverTS<T> implements IObserver<T> {
  private fn: (value: T) => void;
  constructor(fn: (value: T) => void) {
    this.fn = fn;
  }
  refresh(value: T): void {
    this.fn(value);
  }
}

const numSubject = new SubjectTS<number>();
const obs1 = new ObserverTS<number>((num) => {
  console.log(`Observer 1 with num: ${num}`);
});

const obs2 = new ObserverTS<number>((num) => {
  console.log(`Observer 2 with num: ${num * 2}`);
});

numSubject.subscribe(obs1);
numSubject.subscribe(obs2);
numSubject.notify(2);

const strSubject = new SubjectTS<string>();
const obs3 = new ObserverTS<string>((str) => {
  console.log(`Observer 3 with upper case string: ${str.toUpperCase()}`);
});

const obs4 = new ObserverTS<string>((str) => {
  console.log(`Observer 4 with lower case string: ${str.toLowerCase()}`);
});

strSubject.subscribe(obs3);
strSubject.subscribe(obs4);
strSubject.notify("Hello World");

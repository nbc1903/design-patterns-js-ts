/*
 * Used to create one instance for all references of the class.
 * This is a creation design pattern
 */

class Singleton {
  constructor() {
    this.random = Math.random();
    if (Singleton.instance) {
      return Singleton.instance;
    }
    Singleton.instance = this;
  }
}

class Singleton2 {
  static getInstance() {
    if (Singleton2.instance) return Singleton2.instance;
    Singleton.instance = this;
    return Singleton.instance;
  }
  constructor() {
    this.random = Math.random();
  }
}

const singleton = new Singleton();
const singleton2 = new Singleton();

const singleton3 = Singleton2.getInstance();
const singleton4 = Singleton2.getInstance();

console.log(
  "is Singleton class a singleton",
  singleton.random == singleton2.random
);
console.log(
  "is Singleton2 class a singleton",
  singleton3.random == singleton4.random
);

// Real Life Case

class WeekDays {
  weekDays = {
    en: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    es: [
      "Lunes",
      "Martes",
      "Miercoles",
      "Jueves",
      "Viernes",
      "Sabado",
      "Domingo",
    ],
  };

  constructor(lang) {
    this.lang = lang;
    if (WeekDays.instance) return WeekDays.instance;
    WeekDays.instance = this;
  }

  getDays() {
    return this.weekDays[this.lang];
  }
}

/*
 * WeekDays class will always return the first instance that was created and
 * trying to create a new instance with new language won't have any effect
 */

const weekDays = new WeekDays("en");
const weekDays2 = new WeekDays();
const weekDays3 = new WeekDays("es");

const checkEqualArrayContent = (a, b) => {
  return JSON.stringify(a) === JSON.stringify(b);
};

/*
 * Checks if the two objects reference the same array of weekDays and
 * the content of the two arrays
 */

console.log(
  "is WeekDays in english singleton: ",
  weekDays.getDays() === weekDays2.getDays() &&
    checkEqualArrayContent(weekDays.getDays(), weekDays2.getDays())
);
console.log(
  "is WeekDays in spanish singleton: ",
  weekDays.getDays() === weekDays3.getDays() &&
    checkEqualArrayContent(weekDays.getDays(), weekDays3.getDays())
);

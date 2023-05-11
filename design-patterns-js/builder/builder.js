/*
 * Usually used when there are too many properties in the constructor
 * and some are optional. Enables the creation of objects with different structures
 * but that still have most of the initial class, through a very clean way.
 * A middleware to control the properties of the class. It can have a director which
 * is useful to have different presets of the class
 * This is a creation design pattern
 */
class Person {
  constructor(name, lastName, age, country, city, hobbies) {
    this.name = name;
    this.lastName = lastName;
    this.age = age;
    this.country = country;
    this.city = city;
    this.hobbies = hobbies;
  }

  getFullName() {
    return this.name + " " + this.lastName;
  }
}

class PersonBuilder {
  constructor() {
    this.reset();
  }

  reset() {
    this.name = "";
    this.lastName = "";
    this.age = 0;
    this.country = "";
    this.city = "";
    this.hobbies = [];
  }

  setName(name) {
    this.name = name;
    return this;
  }

  setLastName(lastName) {
    this.lastName = lastName;
    return this;
  }

  setAge(age) {
    this.age = age;
    return this;
  }

  setCountry(country) {
    this.country = country;
    return this;
  }
  setCity(city) {
    this.city = city;
    return this;
  }

  addHobby(hobby) {
    this.hobbies.push(hobby);
    return this;
  }

  build() {
    const person = new Person(
      this.name,
      this.lastName,
      this.age,
      this.country,
      this.city,
      this.hobbies
    );
    this.reset();
    return person;
  }
}

const personBuilder = new PersonBuilder();
const nicolas = personBuilder
  .setName("Nicolas")
  .setLastName("Bolanos")
  .addHobby("eat")
  .addHobby("sleep")
  .build();
console.log(nicolas);

const juan = personBuilder
  .setName("Juan")
  .setLastName("Perez")
  .setAge(20)
  .addHobby("eat")
  .setCountry("Colombia")
  .setCity("Bogota")
  .addHobby("games")
  .build();
console.log(juan);

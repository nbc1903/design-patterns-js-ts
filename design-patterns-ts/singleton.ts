class SingletonTS {
  private static instance: SingletonTS;
  random: number;

  // avoid creating new instances for the class making it private
  private constructor() {
    this.random = Math.random();
  }

  static getInstance(): SingletonTS {
    if (!this.instance) this.instance = new SingletonTS();
    return this.instance;
  }
}

const singleton0 = SingletonTS.getInstance();
const singleton1 = SingletonTS.getInstance();

console.log(
  "is SingletonTS singleton: ",
  singleton0.random === singleton1.random
);

console.log("singleton0 random: ", singleton0.random);
console.log("singleton1 random: ", singleton1.random);

//changes for all references of the instances
singleton0.random = 3;

console.log("singleton0 random: ", singleton0.random);
console.log("singleton1 random: ", singleton1.random);

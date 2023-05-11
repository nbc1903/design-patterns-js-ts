/*
 * Adds functionality (scalability) to the context without changing it
 * Useful when having change in behavior of an object during execution time.
 * This a behavior design pattern
 */

class SaleContext {
  constructor(strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  calculate(amount) {
    return this.strategy.calculate(amount);
  }
}

class RegularSaleStrategy {
  constructor(tax) {
    this.tax = tax;
  }

  calculate(amount) {
    return amount + amount * this.tax;
  }
}

class DiscountSaleStrategy {
  constructor(tax, discount) {
    this.tax = tax;
    this.discount = discount;
  }

  calculate(amount) {
    return amount + amount * this.tax - this.discount;
  }
}

class ForeignSaleStrategy {
  calculate(amount) {
    return amount * this.getChangeRate();
  }
  getChangeRate() {
    //This can be an API request
    return 20;
  }
}

const regularSale = new RegularSaleStrategy(0.16);
const discountSale = new DiscountSaleStrategy(0.16, 3);
const foreignSale = new ForeignSaleStrategy();
const sale = new SaleContext(regularSale);

console.log("usual sale: ", sale.calculate(10));

sale.setStrategy(discountSale);

console.log("discount strategy sale: ", sale.calculate(10));

sale.setStrategy(foreignSale);

console.log("foreign strategy sale: ", sale.calculate(10));

// Real Life Case

const data = [
  {
    name: "Kyle",
    age: 21,
    country: "Germany",
  },
  {
    name: "Alex",
    age: 30,
    country: "USA",
  },
  {
    name: "Alice",
    age: 32,
    country: "Canada",
  },
];

class InfoContext {
  constructor(strategy, data, element) {
    this.setStrategy(strategy);
    this.data = data;
    this.element = element;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  show() {
    this.strategy.show(this.data, this.element);
  }
}

class ListStrategy {
  show(data, element) {
    element.innerHTML = data.reduce((ac, person) => {
      return (
        ac +
        `
      <div> 
      <p>${person.name}</p>
      </div>
      <hr>`
      );
    }, "");
  }
}

class DetailListStrategy {
  show(data, element) {
    element.innerHTML = data.reduce((ac, person) => {
      return (
        ac +
        `
      <div> 
      <h2>${person.name}</h2>
      <p>country: ${person.country}</p>
      <p>age: ${person.age}</p>
      </div>
      <hr>`
      );
    }, "");
  }
}

class ListWithAgeStrategy {
  show(data, element) {
    element.innerHTML = data.reduce((ac, person) => {
      return (
        ac +
        `
      <div> 
      <h2>${person.name}</h2>
      <p>age: ${person.age}</p>
      </div>
      <hr>`
      );
    }, "");
  }
}

const strategies = [
  new ListStrategy(),
  new DetailListStrategy(),
  new ListWithAgeStrategy(),
];
const info = new InfoContext(new ListStrategy(), data, content);
slcOptions.addEventListener("change", (event) => {
  info.setStrategy(strategies[event.target.value]);
  info.show();
});

/*
 * Decorator is used to wrap functionality over some other functionality.
 * This can have as many levels as needed. Solves problems where there is
 * a lot of hierarchy involved.
 * This is a structural design pattern
 */

// component
class ProductComponent {
  constructor(name) {
    this.name = name;
  }

  getDetail() {
    return `${this.name}`;
  }
}

// decorator
class ProductDecorator {
  constructor(productComponent) {
    this.productComponent = productComponent;
  }

  getDetail() {
    return this.productComponent.getDetail();
  }
}

// decorator 1
class CommercialInfoProductDecorator extends ProductDecorator {
  constructor(productComponent, brand) {
    super(productComponent);

    this.brand = brand;
  }

  getDetail() {
    return `${this.brand} ` + super.getDetail();
  }
}

// decorator 2
class StoreProductDecorator extends ProductDecorator {
  constructor(productComponent, price) {
    super(productComponent);

    this.price = price;
  }

  getDetail() {
    return super.getDetail() + ` $ ${this.price}`;
  }
}

// decorator 3
class HTMLProductDecorator extends ProductDecorator {
  getDetail() {
    return `<h1>Product Information</h1>
      <p>
          ${super.getDetail()}
      </p>`;
  }
}

// Execution
// component
const productComponent = new ProductComponent("Drink");
console.log(productComponent.getDetail());

// decorator 1 con component
const commercialInfoProduct = new CommercialInfoProductDecorator(
  productComponent,
  "Coca Cola"
);
console.log(commercialInfoProduct.getDetail());

// decorator 2 con component
const storeProduct = new StoreProductDecorator(productComponent, 16);
console.log(storeProduct.getDetail());

// decorator 2 con decorator 1
const product = new StoreProductDecorator(commercialInfoProduct, 2);
console.log(product.getDetail());

// decorator 3 con decorator 2 con decorator 1
const htmlProductDecorator = new HTMLProductDecorator(product);
myDiv.innerHTML = htmlProductDecorator.getDetail();

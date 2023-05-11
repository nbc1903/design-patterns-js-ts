// component
interface ComponentTS {
  getDetail(): string;
}

// concrete component
class ProductComponentTS implements ComponentTS {
  protected name: string;

  constructor(name: string) {
    this.name = name;
  }

  public getDetail(): string {
    return `${this.name}`;
  }
}

// decorator
abstract class ProductDecoratorTS implements ComponentTS {
  protected component: ComponentTS;

  constructor(component: ComponentTS) {
    this.component = component;
  }

  getDetail() {
    return this.component.getDetail();
  }
}

// decorator 1
class CommercialInfoProductDecoratorTS extends ProductDecoratorTS {
  private brand: string;

  constructor(component: ComponentTS, brand: string) {
    super(component);

    this.brand = brand;
  }

  getDetail(): string {
    return `${this.brand} ` + super.getDetail();
  }
}

// decorator 2
class StoreProductDecoratorTS extends ProductDecoratorTS {
  private price: number;

  constructor(component: ComponentTS, price: number) {
    super(component);

    this.price = price;
  }

  getDetail(): string {
    return super.getDetail() + ` $ ${this.price}`;
  }
}

// decorator 3
class HTMLProductDecoratorTS extends ProductDecoratorTS {
  getDetail(): string {
    return `<h1>Product Information</h1>
                <p>
                    ${super.getDetail()}
                </p>`;
  }
}

// Execution
// component
const productComponentTS = new ProductComponentTS("Watch");
console.log(productComponentTS.getDetail());

// decorator 1 with component
const commercialInfoProductTS = new CommercialInfoProductDecoratorTS(
  productComponentTS,
  "Rolex"
);
console.log(commercialInfoProductTS.getDetail());

// decorator 2 with component
const storeProductTS = new StoreProductDecoratorTS(productComponentTS, 500);
console.log(storeProductTS.getDetail());

// decorator 2 with decorator 1
const storeProduct2 = new StoreProductDecoratorTS(
  commercialInfoProductTS,
  15.5
);
console.log(storeProduct2.getDetail());

// decorator 3 with decorator 2 with decorator 1
const htmlProductDecoratorTS = new HTMLProductDecoratorTS(storeProduct2);
console.log(htmlProductDecoratorTS.getDetail());

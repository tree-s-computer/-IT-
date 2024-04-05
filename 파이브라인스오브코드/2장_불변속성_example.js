class Product {
  name;
  daysUntilExpiry;
  value;
  urgency;

  constructor(name, daysUntilExpiry, value) {
    this.name = name;
    this.daysUntilExpiry = daysUntilExpiry;
    this.value = value;
  }

  decrementExpiry() {
    return (this.daysUntilExpiry -= 1);
  }

  getUrgency() {
    this.urgency = this.value / this.daysUntilExpiry;
    return this.urgency;
  }
}

class Manager {
  products = [];

  constructor(products) {
    this.products = products;
  }

  viewProduct() {
    this.products.forEach((product) => {
      const urgency = product.getUrgency();
      console.log(`${product.name} urgency: ${urgency}`);
    });
  }

  filterExpireProduct() {
    this.products = this.products.filter(
      (product) => product.daysUntilExpiry > 0
    );
  }

  updateProducts() {
    this.products.forEach((product) => {
      product.decrementExpiry();
    });

    this.filterExpireProduct();
  }
}

const apple = new Product("Apple", 5, 10);
const carrot = new Product("Carrot", 3, 5);
const lightBulb = new Product("Light Bulb", 0, 3);

const manager = new Manager([apple, lightBulb]);

manager.updateProducts();
manager.viewProduct();

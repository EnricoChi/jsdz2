class ProductsList {
  constructor(container = '.products') {
    this.container = container;
    this.goods = [];
    this.allProducts = [];
    this._getProducts();
  }

  _getProducts() {
    this.goods = [
      {title: 'Notebook', price: 2000},
      {title: 'Mouse', price: 20},
      {title: 'Keyboard', price: 35},
      {title: 'Gamepad', price: 48},
      {title: 'Chair', price: 500},
    ];
  }

  /**
   * Посчитает сумму стоимости всех товаров. Только не ясно зачем этот метод вот тут <-------------------------------
   */
  sumProductPrice() {
    return this.allProducts.reduce((itemsSum, nextItem) => itemsSum + nextItem.price, 0)
  }

  render() {
    const block = document.querySelector(this.container);
    for (let product of this.goods) {
      const productObj = new ProductItem(product.title, product.price);
      this.allProducts.push(productObj);
      block.insertAdjacentHTML('beforeend', productObj.render());
    }
  }
}

class ProductItem {
  constructor(title, price, img = 'https://via.placeholder.com/200/169AAF/fff?text=product+img') {
    this.title = title;
    this.price = price;
    this.img = img;
  }

  render() {
    return `<div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-4">
              <div class="card text-white bg-dark mb-2">
                  <img src="${this.img}">
                  <div class="card-body">
                    <h5 class="card-title">${this.title}</h5>
                    <p class="card-text"><i class="fas fa-dollar-sign"></i> ${this.price}</p>
                    <a href="#" class="btn btn-info d-block">Add to cart</a>
                  </div>
              </div>
          </div>`
  }
}

let products = new ProductsList();
products.render();


class Cart {
  constructor(container = '') {
    this.container = container;
    this.rawProducts = [];
    this.cartItemObj = [];
    this._getOfStorage();
  }

  /**
   * Вынет товары из lockal storage и видимо запишет в this.addedProducts
   * @private
   */
  _getOfStorage() {
    this.rawProducts = '...';
  }

  /**
   * Пишет json из товаров в lockal storage
   * @private
   */
  _setToStorage() {

  }

  /**
   * Слушает эвент клика по кнопке -/+ на товаре
   */
  changeProduct() {

  }

  /**
   * Добавит товар
   */
  addProduct() {

  }

  /**
   * Удалить товар
   */
  delProduct() {

  }

  /**
   * Считает цену добавленых товаров
   */
  getTotalPrice() {

  }

  /**
   * Считает количество добавленных товаров
   */
  getTotalCount() {

  }

  /**
   * Покажет инфо о количестве и цене в верхней панели лучше
   */
  renderToBar() {

  }

  /**
   * Отрендерит таблицу на странице корзины
   */
  render() {

  }
}

class CartItem extends ProductItem {

  // А он вообще всегда нужен? Или если ничего не меняем, то он просто наследуется?
  constructor(title, price, img) {
    super(title, price, img);
    this.itemsCount = null;
    this.itemsPrice = null;
  }

  /**
   * Посчитает количество каждого товара
   */
  getCountItems() {

  }

  /**
   * Посчитает итоговую сумму на количество каждого товара
   */
  getPriceItems() {

  }

  /**
   * Надо переопределить, родительский не подходит
   */
  render() {

  }
}

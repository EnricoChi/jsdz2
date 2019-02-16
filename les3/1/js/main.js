const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

let getRequest = (url) => {
  let xhr = new XMLHttpRequest();
  return new Promise((resolve, reject) => {
    xhr.open('GET', url, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status !== 200) {
          reject(`Error. ${xhr.statusText}`)
        } else {
          resolve(xhr.responseText)
        }
      }
    };
    xhr.send();
  })
};

class ProductsList {
  constructor(container = '.products') {
    this.container = container;
    this.goods = [];
    this.allProducts = [];
    this._getProducts();
  }

  _getProducts() {
    getRequest(`${API}/catalogData.json`)
      .then(result => {
        this.goods = JSON.parse(result);
        this.render();
      })
      .catch(error => console.log(error))
  }

  /**
   * Посчитает сумму стоимости всех товаров.
   */
  sumProductPrice() {
    return this.allProducts.reduce((itemsSum, nextItem) => itemsSum + nextItem.price, 0)
  }

  render() {
    const block = document.querySelector(this.container);
    for (let product of this.goods) {
      const productObj = new ProductItem(product.product_name, product.price, product.id_product);
      this.allProducts.push(productObj);
      block.insertAdjacentHTML('beforeend', productObj.render());
    }
  }
}

class ProductItem {
  constructor(title, price, id, img = 'https://via.placeholder.com/200/169AAF/fff?text=product+img') {
    this.title = title;
    this.price = price;
    this.id = id;
    this.img = img;
  }

  render() {
    return `<div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-4">
              <div class="card text-white bg-dark mb-2">
                  <img src="${this.img}">
                  <div class="card-body">
                    <h5 class="card-title">${this.title}</h5>
                    <p class="card-text"><i class="fas fa-dollar-sign"></i> ${this.price}</p>
                    <a href="#"
                        data-method="addProduct"
                        data-product-title="${this.title}"
                        data-product-price="${this.price}"
                        data-product-id="${this.id}"
                        class="cart-btn btn btn-info d-block">
                        Add to cart
                    </a>
                  </div>
              </div>
          </div>`
  }
}

let products = new ProductsList();


class Cart {
  constructor(container = '#cart') {
    this.container = container;
    this.rawProducts = [];
    this.allCartItems = [];
    this._getBasket();
  }

  _getBasket() {
    fetch(`${API}/getBasket.json`)
      .then(response => response.json())
      .then(result => {
        this.rawProducts = result.contents;
        this.render();
      })
  }

  /**
   * Слушает эвент клика по кнопке -/+ на товаре
   */
  changeProduct() {
    document.querySelector(this.wrapper).addEventListener('click', event => {
      if (event.target.classList.contains('cart-btn')) {
        const productEl = event.target,
          id = productEl.dataset.productId,
          title = productEl.dataset.productTitle,
          price = productEl.dataset.productPrice,
          method = productEl.dataset.method;

        this[method](id, title, price);
      }
    });
  }

  /**
   * Добавит товар
   */
  addProduct(id, title, price) {
    // for (let product of this.goods) {
    const cartItemObj = new CartItem(id, title, price);
    this.allCartItems.push(cartItemObj);
    console.log(this.allCartItems);
    // block.insertAdjacentHTML('beforeend', productObj.render());
    // }
  }

  /**
   * Удалить товар
   */
  delProduct(productId) {
    console.log(productId);
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
    const block = document.querySelector('.modal-body');
    for (let item of this.rawProducts) {
      const cartObj = new CartItem(item.id_product, item.product_name, item.price, item.quantity);
      this.allCartItems.push(cartObj);
      block.insertAdjacentHTML('beforeend', cartObj.render());
    }
  }
}

class CartItem extends ProductItem {
  constructor(id, title, price, qt, img) {
    super(title, price, img);
    this.qt = qt;
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

  render() {
    return `
      <div class="row align-items-center"
        data-id=${this.id}>
        <div class="col-1"><img class="img-fluid" src="${this.img}"></div>
        <div class="col-3">${this.title}</div>
        <div class="col-3">Price: <i class="fas fa-dollar-sign"></i> ${this.price}</div>
        <div class="col-3">Qt: <span class="product-qt">${this.qt}</span></div>
        <div class="col-2">
          <div class="btn-group">
            <button class="btn btn-danger">-</button>
            <button class="btn btn-info">+</button>
           </div>
        </div>
      </div>
      <hr>`
  }
}

new Cart();

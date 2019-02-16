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
      const productObj = new ProductItem(product.id_product, product.product_name, product.price);
      this.allProducts.push(productObj);
      block.insertAdjacentHTML('beforeend', productObj.render());
    }
  }
}

class ProductItem {
  constructor(id, title, price, img = 'https://via.placeholder.com/200/169AAF/fff?text=product+img') {
    this.id = id;
    this.title = title;
    this.price = price;
    this.img = img;
  }

  render() {
    return `
      <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-4">
        <div class="card text-white bg-dark mb-2">
          <img src="${this.img}">
          <div class="card-body">
            <h5 class="card-title">${this.title}</h5>
            <p class="card-text"><i class="fas fa-dollar-sign"></i> ${this.price}</p>
            <a href="#"
                data-method="addProduct"
                data-product-id="${this.id}"
                data-product-title="${this.title}"
                data-product-price="${this.price}"
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
  constructor(container = '#cart', productsContainer = '.products') {
    this.container = container;
    this.productsContainer = productsContainer;
    this.rawProducts = [];
    this.allCartItems = [];
    this.changeProduct()
  }

  _getBasket() {
    return fetch(`${API}/getBasket.json`)
      .then(response => response.json())
      .then(result => this.rawProducts = result.contents)
  }

  init() {
    this._getBasket().then(() => this.render())
  }

  changeProduct() {
    // let methods = {addProduct: this.addProduct};
    document.querySelector(this.container).addEventListener('click', event => {
      if (event.target.classList.contains('cart-btn')) {
        const productEl = event.target,
          parentEl = productEl.parentElement,
          id = parentEl.dataset.productId,
          method = productEl.dataset.method;
        this[method](id);
      }
    });

    document.querySelector(this.productsContainer).addEventListener('click', event => {
      if (event.target.classList.contains('cart-btn')) {
        const productEl = event.target,
          id = productEl.dataset.productId;

        products.allProducts.forEach(item => {
          if (item.id === +id) {
            let newProduct = new CartItem(item.id, item.title, item.price);
            if (!this.addProduct(id)) {
              this.pushProduct(newProduct);
            }
          }
        });
      }
    });
  }

  pushProduct(newProduct) {
    this.allCartItems.push(newProduct);
    const block = document.querySelector('.modal-body');
    block.insertAdjacentHTML('beforeend', newProduct.render());
  }

  /**
   * Добавит товар
   */
  addProduct(id) {
    for (let i = 0; i < this.allCartItems.length; i++) {
      if (this.allCartItems[i].id === +id) {
        this.updateCartItem(id, i, '+');
        return true;
      }
    }
  }

  /**
   * Удалить товар
   */
  delProduct(id) {
    for (let i = 0; i < this.allCartItems.length; i++) {
      if (this.allCartItems[i].id === +id) {
        this.updateCartItem(id, i, '-');
      }
    }
  }

  updateCartItem(id, index, action) {
    let del = false;
    if (action === '-') {
      if (this.allCartItems[index].qt > 1) {
        --this.allCartItems[index].qt;
      } else {
        del = this.allCartItems.splice(index, 1);
      }
    } else {
      ++this.allCartItems[index].qt;
    }

    document.querySelector(`[data-product-id="${id}"]`)
      .outerHTML = !del ? this.allCartItems[index].render() : '';
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
  constructor(id, title, price, qt = 1) {
    super(id, title, price);
    this.qt = qt;
  }

  render() {
    return `
      <div data-product-id=${this.id}>
        <div class="cart row align-items-center">
          <div class="col-1"><img class="img-fluid" src="${this.img}"></div>
          <div class="col-3">${this.title}</div>
          <div class="col-3">
            Price: <i class="fas fa-dollar-sign"></i> <span class="product-price">${this.price * this.qt}</span>
          </div>
          <div class="col-3">Qt: <span class="product-qt">${this.qt}</span></div>
          <div class="col-2">
            <div class="btn-group"
              data-product-title="${this.title}"
              data-product-price="${this.price}"
              data-product-qt="${this.qt}"
              data-product-id=${this.id}>
              <button data-method="delProduct" class="cart-btn btn btn-danger">-</button>
              <button data-method="addProduct" class="cart-btn btn btn-info">+</button>
            </div>
          </div>
        </div>
        <hr>
      </div>`
  }
}

let test = new Cart();
test.init();

'use strict';

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

let products = new Vue({
  el: '#products',
  data: {
    products: [],
    showedProducts: [],
    searchEl: document.querySelector("#search"),
  },
  methods: {
    getProducts: function () {
      fetch(`${API}/catalogData.json`)
        .then(response => response.json())
        .then(result => {
          this.products = result;
          this.showProducts();
        })
    },
    productFilter(value) {
      const regexp = new RegExp(value, 'i');
      this.showedProducts = this.products.filter(el => regexp.test(el.product_name));
    },
  },
  computed: {
    showProducts: function () {
      this.showedProducts = this.products;
    },
  },
  mounted: function () {
    this.getProducts();

    this.searchEl.reset();
    this.searchEl.addEventListener('input', (e) => this.productFilter(e.target.value));
  }
});


let cart = new Vue({
  el: '#cart-wrapper',
  data: {
    cartShow: false,
    products: [],
    amount: null,
    countGoods: null,
  },
  methods: {
    getCartItems: function () {
      fetch(`${API}/getBasket.json`)
        .then(response => response.json())
        .then(result => {
          this.products = result.contents;
          this.amount = result.amount;
          this.countGoods = result.countGoods;
        })
    },
    addProduct: function (id, event) {
      this.products.forEach((el, index) => {
        if (el.id_product === id) {
          this.products[index].quantity++;
        }
      });
    },
    delProduct: function (id, event) {
      this.products.forEach((el, index) => {
        if (el.id_product === id) {
          if (this.products[index].quantity > 1) {
            this.products[index].quantity--;
          } else {
            this.products.splice(index, 1);
          }
        }
      });
    }
  },
  mounted: function () {
    this.getCartItems();
  }
});
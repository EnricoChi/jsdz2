'use strict';

const products = [
    {title: 'Notebook', price: 2000},
    {title: 'Mouse', price: 20},
    {title: 'Keyboard', price: 35},
    {title: 'Gamepad', price: 48},
    {title: 'Chair', price: 500},
  ],
  // Лучше конечно в обьект каждого продукта пихать, но пока так просто
  img = 'https://via.placeholder.com/200/169AAF/fff?text=product+img';

const renderProduct = (title, price) => {
  return `<div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-4">
              <div class="card text-white bg-dark mb-2">
                  <img src="${img}">
                  <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text"><i class="fas fa-dollar-sign"></i> ${price}</p>
                    <a href="#" class="btn btn-info d-block">Add to cart</a>
                  </div>
              </div>
          </div>`
};

const renderPage = list => {
  const productList = list.map(item => renderProduct(item.title, item.price));
  document.querySelector('.products').innerHTML = productList.join(''); // <--- .join() сделает строку и уберёт запятые

  // Не уверен что это тот вариант упрощения который имелся ввиду, но на ум вот так приходит:
  list.forEach(
    item => document.querySelector('.products').insertAdjacentHTML('beforeEnd', renderProduct(item.title, item.price)));
};

renderPage(products);


// Либо может вот так?
const renderProduct2 = (title, price, productWrapperSelector = '.products') => {
  const productWrapperEl = document.querySelector(productWrapperSelector);

  productWrapperEl.innerHTML += `
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-4">
      <div class="card text-white bg-dark mb-2">
        <img src="${img}">
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p class="card-text"><i class="fas fa-dollar-sign"></i> ${price}</p>
          <a href="#" class="btn btn-info d-block">Add to cart</a>
        </div>                   
      </div>
    </div>`
};

products.forEach(item => renderProduct2(item.title, item.price));


import { cart as initialCart } from '../data/cart.js';
import { products } from '../data/products.js';

let cart = JSON.parse(localStorage.getItem('cart')) || initialCart || [];
let cartQuantity = JSON.parse(localStorage.getItem('cartQuantity')) || 0;

document.addEventListener('DOMContentLoaded', () => {
  const cartQuantityElement = document.querySelector('.cart-quantity');
  if (cartQuantityElement) {
    cartQuantityElement.innerHTML = cartQuantity;
  }
  productsDisplayLoop();
  updateCartQuantity();
});



function productsDisplayLoop () {
  let productGridElement = document.querySelector('.products-grid');
  if (!productGridElement) {
    console.error('No .products-grid element found in the DOM.');
    return;
  }



  let productGridHTML = ''

  products.forEach((product) => {
    
    let productHTML = 
      `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars*10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class="quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart-${product.id} added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary" 
          data-product-id="${product.id}"
          data-product-name="${product.name}">
            Add to Cart
          </button>
        </div>`

        productGridHTML += productHTML
  })

  document.querySelector('.products-grid').innerHTML = productGridHTML

  let timeOutIds = {}
  
  document.querySelectorAll('.add-to-cart-button').forEach(cartbttn => {
    // function for every cart button
    cartbttn.addEventListener('click', () => {
      // executes code after cart button is clicked
      let productName = cartbttn.dataset.productName;
      let productId = cartbttn.dataset.productId;
      let quantity = Number(document.querySelector(`.quantity-selector-${productId}`).value)
      let matchingItem;

      matchInCart(productId, quantity, productName, matchingItem);
      

      document.querySelector(`.added-to-cart-${productId}`)
        .classList.add('added');

        if (timeOutIds.productId) {
          clearTimeout(timeOutIds.timeOutId)
        }

        timeOutIds.productId = setTimeout(() => {
          document.querySelector(`.added-to-cart-${productId}`)
            .classList.remove('added')
        }, 2000)
        console.log(timeOutIds)
        localStorage.setItem('cart', JSON.stringify(cart))

        updateCartQuantity();
        renderPaymentSummary()
  })
  
  })
}

function matchInCart (productId, quantity, productName, matchingItem) {
  cart.forEach((product) => {
    if (productId === product.productId) {
      matchingItem = product
    }
  });

  if (!matchingItem) {
    cart.push({
      productId,
      productName, 
      quantity
    })
  } else {
    matchingItem.quantity+=quantity
  }

}

  
export function updateCartQuantity () {
  
   cartQuantity = 0
   let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.forEach(product => {
      let cartNum = Number(product.quantity)
      cartQuantity += cartNum
    })

    let amazonCartQuantity = document.querySelector('.cart-quantity')
    let cartDOMQuantity = document.querySelector('.return-to-home-link')
  
    if (amazonCartQuantity) {
      amazonCartQuantity.innerHTML = cartQuantity
    }

    if (cartDOMQuantity) {
      cartDOMQuantity.innerHTML = cartQuantity
    }
  
  
}





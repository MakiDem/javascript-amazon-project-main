import {cart} from '../data/cart.js';
import {products} from '../data/products.js'

productsDisplayLoop()


function productsDisplayLoop () {
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
  
  
      console.log(cart)

      let cartQuantity = 0
      cart.forEach(product => {
        let cartNum = product.quantity
        cartQuantity += cartNum
      })

      console.log(cartQuantity)


      document.querySelector('.cart-quantity').innerText = cartQuantity

      

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
  })
  
  })
}






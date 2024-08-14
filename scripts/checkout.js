import {cart as initialCart} from '../data/cart.js';
import {products} from '../data/products.js';
import {deleteFromCart} from '../data/cart.js';
import {updateCartQuantity} from './amazon.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';







document.addEventListener('DOMContentLoaded', () => {
  renderCartHTML()
});


export function renderCartHTML () {


  let cart = JSON.parse(localStorage.getItem('cart')) || initialCart || [];
  updateCartQuantity();


  if (cart.length === 0) {
    document.querySelector('.order-summary').innerHTML = '<p>Your cart is empty.</p>';
    return;}

    let today = dayjs();
    console.log(today)

    let deliveryDate = today.add(7, 'days')
    let deliveryDateHTML = deliveryDate.format('dddd, MMMM D')

    let delivery499Date = today.add(5, 'days').format('dddd, MMMM D')
    let delivery999Date = today.add(3, 'days').format('dddd, MMMM D')
    

  
  
    let cartListHTML = '';

    cart.forEach((cartItem) => {
      let productId = cartItem.productId
    
      let matchProduct;

      products.forEach((product) => {
        if (product.id === productId) {
          matchProduct = product
        }
      });

      let cartItemHTML = 
        `<div class="cart-item-container">
          <div class="delivery-date" data-date-id="${matchProduct.id}">
            Delivery date: ${deliveryDateHTML}
          </div>
    
          <div class="cart-item-details-grid">
            <img class="product-image"
              src="${matchProduct.image}">
    
            <div class="cart-item-details">
              <div class="product-name">
                ${matchProduct.name}
              </div>
              <div class="product-price">
                $${matchProduct.priceCents/100}
              </div>
              <div class="product-quantity">
                <span>
                  Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary" data-product-id="${matchProduct.id}">
                  Update
                </span>
                <input class="update-quantity-input">
                <span class="save-quantity-link link-primary" data-product-id="${matchProduct.id}">
                  Save
                </span>
                <span class="delete-quantity-link link-primary" data-product-id="${matchProduct.id}">
                  Delete
                </span>
              </div>
            </div>
    
            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
              <div class="delivery-option">
                <input type="radio" checked
                  class="delivery-option-input"
                  name="${matchProduct.id}"
                  data-delivery-price-id='1'>
                <div>
                  <div class="delivery-option-date">
                    ${deliveryDateHTML}
                  </div>
                  <div class="delivery-option-price">
                    FREE Shipping
                  </div>
                </div>
              </div>
              <div class="delivery-option">
                <input type="radio"
                  class="delivery-option-input"
                  name="${matchProduct.id}"
                  data-delivery-price-id='2'>
                <div>
                  <div class="delivery-option-date">
                  ${delivery499Date}
                  </div>
                  <div class="delivery-option-price">
                    $4.99 - Shipping
                  </div>
                </div>
              </div>
              <div class="delivery-option">
                <input type="radio"
                  class="delivery-option-input"
                  name="${matchProduct.id}"
                  data-delivery-price-id='3'>
                <div>
                  <div class="delivery-option-date">
                  ${delivery999Date}
                  </div>
                  <div class="delivery-option-price">
                    $9.99 - Shipping
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`;
        

    
      cartListHTML += cartItemHTML;
    
    })//end of the cart forEach Loop that adds every cartItemHTML to the cartListHTML variable
    ;
    document.querySelector('.order-summary').innerHTML = cartListHTML;// puts the cartListHTML inside the class div to generate HTML
    
    // sets a function for delete links
    document.querySelectorAll('.delete-quantity-link').forEach((deleteLink) => {
      deleteLink.addEventListener('click', () => {

        let productId = deleteLink.dataset.productId
        
        deleteFromCart(productId);
        
        
        renderCartHTML();
        updateCartQuantity();
        
      });
    });

    updateCartQuantity();

    document.querySelectorAll('.update-quantity-link').forEach(updateLink => {
      updateLink.addEventListener('click', (event) => {
        let parent = event.target.parentElement;
        console.log(parent)
        let updateInput = parent.querySelector('.update-quantity-input');
        let saveLink = parent.querySelector('.save-quantity-link');
  
        updateInput.style.display = 'inline';
        saveLink.style.display = 'inline';
        event.target.style.display = 'none'; // Hide the "Update" link
      });
    });
  
    document.querySelectorAll('.save-quantity-link').forEach(saveLink => {
      saveLink.addEventListener('click', (event) => {
        let productId = event.target.dataset.productId;
        let updateInput = event.target.previousElementSibling;

        if (!updateInput.value) {
          return;
        }
  
        updateCartItemQuantity(productId, cart, updateInput.value);
  
        renderCartHTML(); // Re-render the cart after saving the quantity
        updateCartQuantity();
      });
    });
    document.querySelectorAll('.delivery-option-input').forEach(deliveryOption => {
      deliveryOption.addEventListener('click', () => {
        let productId = deliveryOption.name;  // Use the radio button's name attribute (productId)
        let deliveryPriceId = deliveryOption.dataset.deliveryPriceId;
    
        // Find the corresponding delivery date element using the productId
        let deliveryDateDisplay = document.querySelector(`.delivery-date[data-date-id="${productId}"]`);
    
        if (deliveryPriceId === '1') {
          deliveryDateDisplay.innerHTML = `Delivery date: ${deliveryDateHTML}`;
        } else if (deliveryPriceId === '2') {
          deliveryDateDisplay.innerHTML = `Delivery date: ${delivery499Date}`;
        } else if (deliveryPriceId === '3') {
          deliveryDateDisplay.innerHTML = `Delivery date: ${delivery999Date}`;
        }
      });
    });

    }
  
  
  function updateCartItemQuantity(productId, cart, newQuantity) {
    // Find the cart item by product ID and update its quantity
    cart = cart.map(cartItem => {
      if (cartItem.productId === productId) {
        return {...cartItem, quantity: parseInt(newQuantity)};
      }
      return cartItem;
    });
  
    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  }

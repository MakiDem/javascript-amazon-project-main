import {cart as initialCart} from '../data/cart.js';
import {products} from '../data/products.js';
import {deleteFromCart} from '../data/cart.js'
import {updateCartQuantity} from './amazon.js'






document.addEventListener('DOMContentLoaded', () => {
  renderCartHTML()
});

export function renderCartHTML () {


  let cart = JSON.parse(localStorage.getItem('cart')) || initialCart || [];
  updateCartQuantity();


  if (cart.length === 0) {
    document.querySelector('.order-summary').innerHTML = '<p>Your cart is empty.</p>';
    return;}

  
  
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
          <div class="delivery-date">
            Delivery date: Tuesday, June 21
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
                <span class="update-quantity-link link-primary">
                  Update
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
                  name="${matchProduct.id}">
                <div>
                  <div class="delivery-option-date">
                    Tuesday, June 21
                  </div>
                  <div class="delivery-option-price">
                    FREE Shipping
                  </div>
                </div>
              </div>
              <div class="delivery-option">
                <input type="radio"
                  class="delivery-option-input"
                  name="${matchProduct.id}">
                <div>
                  <div class="delivery-option-date">
                    Wednesday, June 15
                  </div>
                  <div class="delivery-option-price">
                    $4.99 - Shipping
                  </div>
                </div>
              </div>
              <div class="delivery-option">
                <input type="radio"
                  class="delivery-option-input"
                  name="${matchProduct.id}">
                <div>
                  <div class="delivery-option-date">
                    Monday, June 13
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
    document.querySelector('.order-summary').innerHTML = cartListHTML;
    

    document.querySelectorAll('.delete-quantity-link').forEach((deleteLink) => {
      deleteLink.addEventListener('click', () => {
        let productId = deleteLink.dataset.productId
        
        deleteFromCart(productId);
      
        renderCartHTML();
        updateCartQuantity();
      });
    });

    updateCartQuantity();
  
  };
  
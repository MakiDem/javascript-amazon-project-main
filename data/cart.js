export let cart = JSON.parse(localStorage.getItem('cart')) || [];

import {updateCartQuantity} from '../scripts/amazon.js'

export function deleteFromCart (productId) {

  cart.forEach((cartItem, i) => {
    if (cartItem.productId === productId) {
      cart.splice(i, 1)
      updateCartQuantity()
    }
  });
 
  localStorage.setItem('cart', JSON.stringify(cart));
  console.log('delete')
}
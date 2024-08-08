export let cart = JSON.parse(localStorage.getItem('cart')) || [];

import {renderCartHTML} from '../scripts/checkout.js'

export function deleteFromCart (productId) {
  localStorage.getItem('cart')
  let cartListHTML = ''
  cart.forEach((cartItem, i) => {
    if (cartItem.productId === productId) {
      cart.splice(i, 1)
    }
  });
  
  localStorage.setItem('cart', JSON.stringify(cart));
  console.log('delete')
}
export let cart = JSON.parse(localStorage.getItem('cart')) || [];
import {renderPaymentSummary} from '../scripts/payment-summary.js'

import {updateCartQuantity} from '../scripts/amazon.js'

export function deleteFromCart (productId) {
  

  cart.forEach((cartItem, i) => {
    if (cartItem.productId === productId) {
      cart.splice(i, 1)
      updateCartQuantity()
    }
  });
 
  localStorage.setItem('cart', JSON.stringify(cart));
  renderPaymentSummary()

  console.log('delete')
}
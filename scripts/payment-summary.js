import { cart as initialCart } from '../data/cart.js';
import { products } from '../data/products.js';
import { deliveryOptions } from '../data/deliveryOptions.js';



export function renderPaymentSummary() {
  // set item quantities
  let cartQuantity = 0
  let cart = JSON.parse(localStorage.getItem('cart')) || initialCart ||[];
  cart.forEach(product => {
    let cartNum = Number(product.quantity)
    cartQuantity += cartNum
  })

  document.querySelector('.item-quantity').innerHTML = `Items (${cartQuantity}):`

  // set price beside item quantities
  let totalPrice = 0
  cart.forEach((cartItem) => {
    let cartItemId = cartItem.productId
    let productMatch = products.find(product => product.id === cartItemId)
    console.log(productMatch)
    
      
    let cartItemCost = (productMatch.priceCents / 100) * cartItem.quantity
    totalPrice += cartItemCost
    document.querySelector('.item-total').innerHTML = `$${totalPrice.toFixed(2)}`
  })

  // set total of shipping fee
  shippingFeeFunc()

  // set total of order
  itemCostWithShipping()

  // set tax cost and taxed total cost
  taxCost()
}



export function shippingFeeFunc () {
  let totalShippingFee= 0

  const cartItems = document.querySelectorAll('.cart-item-container');// selects all cart items

  // loops through each cart item
  cartItems.forEach((cartItem) => {
    let radioOptions = cartItem.querySelectorAll('input[type="radio"]'); // selects all radio buttons in a single cartItem
    let shippingId;

    // checks which delivery option is selected
    radioOptions.forEach((radioOption) => {
      if (radioOption.checked) {
        shippingId = radioOption.dataset.deliveryPriceId
      }
    })

    // adds the price of the selected delivery option based on shipping id
    deliveryOptions.forEach((deliveryOption) => {
      if (deliveryOption.id === shippingId) {
        totalShippingFee +=deliveryOption.priceCents
      }
    })

    document.querySelector('.shipping-cost').innerHTML = `$${(totalShippingFee / 100).toFixed(2)}`
    itemCostWithShipping()
  })
    
    
}

function itemCostWithShipping () {
  let itemCost = Number(document.querySelector('.item-total').innerHTML.replace('$', ''));
  let shippingCost = Number(document.querySelector('.shipping-cost').innerHTML.replace('$', ''));

  let totalCost = itemCost + shippingCost
  document.querySelector('.subtotal').innerHTML = `$${totalCost.toFixed(2)}`
  taxCost()
}

function taxCost () {
  let cost = Number(document.querySelector('.subtotal').innerHTML.replace('$', ''));
  let tax = 0.1;
  let taxCost = cost * tax

  document.querySelector('.tax-cost').innerHTML = `$${(taxCost).toFixed(2)}` // cost * tax
  document.querySelector('.final-cost').innerHTML = `$${(cost + taxCost).toFixed(2)}` // cost + tax
}

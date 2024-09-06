import { fetchProducts } from "../data/products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";



export class OrderPage {
  constructor() {
    this.orders = JSON.parse(localStorage.getItem('orders')) || [];
    this.cart = JSON.parse(localStorage.getItem('cart')) || [];
  }
  // fetch products
  async loadProducts() {
    let products = await fetchProducts()
    return products
  }
  

  addOrder (order) {
    this.orders.unshift(order)
    localStorage.setItem('orders', JSON.stringify(this.orders))
    console.log(this.orders)
  }

  async renderOrderHTML () {
    let products = await this.loadProducts()
    let orderListHTML = ""
    this.orders.forEach((order) => {
      let orderTime = dayjs(order.orderTime).format('MMMM D, YYYY')
      let orderItemHTML = 
      `<div class="order-container">
  
       <div class="order-header">
         <div class="order-header-left-section">
           <div class="order-date">
             <div class="order-header-label">Order Placed:</div>
             <div>${orderTime}</div>
           </div>
           <div class="order-total">
             <div class="order-header-label">Total:</div>
             <div>$${order.totalCostCents / 100}</div>
           </div>
         </div>
  
         <div class="order-header-right-section">
           <div class="order-header-label">Order ID:</div>
           <div>${order.id}</div>
         </div>
       </div>
  
       <div class="order-details-grid">
          ${this.renderOrderedProducts(order, products)}
      </div>`
  
     orderListHTML+= orderItemHTML;
  
  
    })
  
    document.querySelector('.orders-grid').innerHTML = orderListHTML
  }

  renderOrderedProducts (order, products) {
    let orderList = ""
    order.products.forEach((item) => {
      let match = products.find(product => product.id === item.productId)
      let deliveryTime = dayjs(item.estimatedDeliveryTime).format('MMMM D, YYYY')
      
      orderList+=
        `<div class="product-image-container">
          <img src="${match.image}">
        </div>

        <div class="product-details">
          <div class="product-name">
            ${match.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${deliveryTime}
          </div>
          <div class="product-quantity">
            Quantity: ${item.quantity}
          </div>
          <button class="buy-again-button button-primary">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html?orderId=${order.id}&productId=${item.productId}">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>`
    })

    return orderList
  }

  async renderCartQuantity () {
    let cartQuantity = 0

    this.cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity
    })

    document.querySelector('.cart-quantity').innerHTML = cartQuantity
  }
  
}

async function renderOrderPage () {
  let orderPage = new OrderPage()
  await orderPage.renderOrderHTML()
  orderPage.renderCartQuantity()
}

renderOrderPage()



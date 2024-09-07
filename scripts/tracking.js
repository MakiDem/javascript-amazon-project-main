import { OrderPage } from "./order.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { fetchProducts } from "../data/products.js";


async function renderTrackProduct (products) {
  let url = new URL(window.location.href);
  let orderId = url.searchParams.get('orderId');
  let productId = url.searchParams.get('productId');
  let orders = new OrderPage().orders;
  let productsData = products
  console.log(productsData)


  let orderIdMatch = orders.find(order => order.id === orderId)
  console.log(orderIdMatch)

  if (!orderIdMatch) {
    document.querySelector('.main').innerHTML = "Order not found, please try again later."
  }

  let productMatch = orderIdMatch.products.find(product => product.productId === productId)
  console.log(productMatch)

  document.querySelector('.main').innerHTML = `
  <div class="order-tracking">
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${dayjs(productMatch.estimatedDeliveryTime).format('dddd, MMM D, YYYY')}
        </div>

        <div class="product-info">
          ${productsData.find(product => {return product.id === productMatch.productId}).name}
        </div>

        <div class="product-info">
          Quantity: ${productMatch.quantity}
        </div>

        <img class="product-image" src="${productsData.find(product => {return product.id === productMatch.productId}).image}">

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
      </div>`
}

async function renderTrackingPage () {
  let products =await fetchProducts()
  renderTrackProduct(products)
}

renderTrackingPage()


"use strict";
const orderDiv = document.querySelector(".div-order-detils");
const isScanned = document.querySelector(".scanned");
const btnPlaceOrder = document.querySelector(".btnPlaceOrder");
const totalAmt = document.querySelector(".totalAmt");
console.log(totalAmt);
const displayOrderDetails = function (order) {
  orderDiv.innerHTML = "";
  order.orderDetails.forEach((order, i) => {
    const markup = `
        <div class="item">
        <div class="item-detail">
          <h1>${order.name}</h1>
          <h2>Rs. ${order.price}</h2>
        </div>
        <div class="item-qty">
          <h1>${order.qty * 250}gm</h1>
          <h2>Rs. ${order.totalPrice}</h2>
        </div>
      </div>
        `;
    orderDiv.insertAdjacentHTML("afterbegin", markup);
  });
  totalAmt.textContent = `${order.total}`;
};

isScanned.addEventListener("click", function () {
  btnPlaceOrder.disabled = false;
  btnPlaceOrder.textContent = "Place Order";
});

const verifyAndPlaceOrder = function (order) {
  console.log(order);
  const url = `https://wa.me/9146530089/?text=ID:${order.id}%20-%20Check%20payment%20of%20Rs.%20${order.total}.`;
  window.open(url, "_blank");
};

window.addEventListener("load", async function (e) {
  const orderID = this.window.location.search.slice(this.window.location.search.indexOf("?")+1);
  const res = await this.fetch(
    `https://retoolapi.dev/3fnlUg/cafe-noon-orders/${orderID}`
  );
  const data = await res.json();
  console.log(data);
  displayOrderDetails(data);
  btnPlaceOrder.addEventListener("click", function () {
    verifyAndPlaceOrder(data);
  });
});

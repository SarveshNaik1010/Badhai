import menuItems from "./menu.json" assert { type: "json" };

const divMenu = document.querySelector(".div--menu");
const btnPlaceOrder = document.querySelector(".btnPlaceOrder");
const menu = menuItems.menu;
const cart = [];

// 1. Add menu items to the UI
menu.forEach(function (item, i) {
  const html = `
    <div class="items" data-orderID = "order-${i + 1}">
    <div class="item-info">
        <h2>${item.name}</h2>
        <p class="price">${item.price}rs.</p>
        <div class="quantity">
          <p class="addMsg addMsg-${i + 1}">1 item added to cart</p>
          <button class="btnAdd add-${i + 1}" data-id="${i}">Add</button>
          <input type="number" class="qty qty-${
            i + 1
          }" value="1" placeholder="Select QTY">
        </div>
    </div>
    </div>
    `;

  divMenu.insertAdjacentHTML("beforeend", html);
});

// 2. Add items to the cart
const btnAdd = document.querySelectorAll(".btnAdd");
btnAdd.forEach(function (btn, i) {
  btn.addEventListener("click", function (e) {
    console.log(btn.dataset.id);
    const selectedItem = { ...menu[btn.dataset.id] };
    selectedItem.totalPrice =
      selectedItem.price * (btn.parentNode.childNodes[5].value || 1);
    selectedItem.qty = btn.parentNode.childNodes[5].value || 1;
    console.log(btn.parentNode.childNodes[5]);
    cart.push(selectedItem);
    const addMsg = document.querySelector(`.addMsg-${i + 1}`);
    addMsg.style.display = "block";
    addMsg.textContent = `Added To Cart`;
    btn.style.display = "none";
    btn.parentNode.childNodes[5].style.display = "none";
  });
});

// 3. Place order
btnPlaceOrder.addEventListener("click", async function (e) {
  console.log(cart);
  let total = 0;
  cart.forEach((item) => (total += item.totalPrice));
  console.log(total);
  const orderID =
    (
      await (
        await fetch(`https://retoolapi.dev/3fnlUg/cafe-noon-orders`)
      ).json()
    ).length + 1;
  console.log(orderID);
  const res = await fetch(`https://retoolapi.dev/3fnlUg/cafe-noon-orders`, {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      orderDetails: cart,
      orderID,
      total,
    }),
  });

  window.location = `./order.html?${orderID}`;
});

// 4.search bar
const searchInput = document.getElementById("searchInput");
const list = document.getElementById("menu");
const items = list.getElementsByTagName("items");

searchInput.addEventListener("input", function () {
  const searchValue = searchInput.value.toLowerCase();

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const itemName = item.textContent.toLowerCase();

    if (itemName.includes(searchValue)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  }
});

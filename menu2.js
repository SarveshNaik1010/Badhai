function search1() {
  const divMenu = document.querySelector(".div--menu");

  const menuItems = {
    menu: [
      {
        name: "Gulab Jamun",
        price: 15,
      },
      {
        name: "Kesar Peda",
        price: 20,
      },
      {
        name: "Moti Choor Ladoo",
        price: 20,
      },
      {
        name: "Kaju Katli",
        price: 25,
      },
      {
        name: "Rasgulla",
        price: 20,
      },
      {
        name: "Malai Barfi",
        price: 25,
      },
      {
        name: "Jalebi",
        price: 30,
      },
      {
        name: "Sohan Papdi",
        price: 40,
      },
      {
        name: "Mix Mithai Box",
        price: 35,
      },
      {
        name: "Badam Halwa",
        price: 30,
      },
      {
        name: "Besan Ladoo",
        price: 30,
      },
      {
        name: "Chum Chum",
        price: 40,
      },
      {
        name: "Pista Barfi",
        price: 15,
      },
      {
        name: "Imarti",
        price: 15,
      },
      {
        name: "Dry Fruit Ladoo",
        price: 25,
      },
      {
        name: "Khoya Kachori",
        price: 15,
      },
      {
        name: "Moong Dal Halwa",
        price: 15,
      },
      {
        name: "Coconut Barfi",
        price: 20,
      },
      {
        name: "Kalakand",
        price: 40,
      },
      {
        name: "Kesar Roll",
        price: 50,
      },
      {
        name: "Chocolate Barfi",
        price: 60,
      },
      {
        name: "Mawa Sweets",
        price: 40,
      },
      {
        name: "Classic Barfi",
        price: 60,
      },
      {
        name: "Kesari Peda",
        price: 80,
      },
      {
        name: "Pista Roll",
        price: 90,
      },
      {
        name: "Anjeer Barfi",
        price: 70,
      },
      {
        name: "Saffron Kesar Mithai",
        price: 50,
      },
      {
        name: "Dry Fruit Halwa",
        price: 30,
      },
      {
        name: "Saffron Biryani (sweet)",
        price: 50,
      },
      {
        name: "Cheese Sandesh",
        price: 50,
      },
      {
        name: "Mava Sandwich",
        price: 40,
      },
      {
        name: "Chilled Lassi",
        price: 40,
      },
      {
        name: "Masala Chai",
        price: 10,
      },
      {
        name: "Milk Badam Doodh",
        price: 15,
      },
    ],
  };
  let searchTerm = document.getElementById("searchInput").value;

  searchTerm = searchTerm.toLowerCase();
  // console.log("searchTerm = " + searchTerm);

  // Filter menu items by search term
  const searchResults = menuItems.menu.filter((item) =>
    item.name.toLowerCase().includes(searchTerm)
  );
  console.log("searchResults = " + searchResults);
  if (searchResults.length > 0) {
    divMenu.innerHTML = ""; // Clear the divMenu content
  }

  searchResults.forEach(function (item, i) {
    const html = `
          <div class="items" data-orderID = "order-${i + 1}">
          <div class="item-info">
              <h2>${item.name}</h2>
              <p class="price">${item.price}rs.</p>
              <div class="quantity">
                <p class="addMsg addMsg-${i + 1}">1 item added to cart</p>
                <button class="btnAdd add-${i + 1}" data-id="${i}">Add</button>
                    250gm X
                <input type="number" style="margin-left: 4px" class="qty qty-${
                  i + 1
                }" value="1" placeholder="Select QTY">
              </div>
          </div>
          </div>
          `;

    divMenu.insertAdjacentHTML("beforeend", html);
  });

  const btnAdd = document.querySelectorAll(".btnAdd");
  const cart = [];

  btnAdd.forEach(function (btn, i) {
    btn.addEventListener("click", function (e) {
      console.log(btn.dataset.id);
      const selectedItem = { ...searchResults[btn.dataset.id] };
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

  // Place order
  const btnPlaceOrder = document.querySelector(".btnPlaceOrder");
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
}

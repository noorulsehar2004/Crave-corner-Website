
// Each restaurant has an array of menu items with name, price
const menuData = {
  ItalianoHub: [
    { name: "Peperoni Pizza", price: 800, img: "food/pizza.png" },
    { name: "Alfredo Pasta", price: 650, img: "food/alferadopasta.png" },
    { name: "Penne Pasta", price: 500, img: "food/pennepasta.png" },
    { name: "Spagetti Pasta", price: 700, img: "food/spagettipasta.png" }
  ],

  DesiTarka: [
    { name: "Chicken Biryani", price: 400, img: "food/biryani.png" },
    { name: "Chicken Karahi", price: 1200, img: "food/korma.png" },
    { name: "Mutton Karahi", price: 1500, img: "food/muttonkarahi.png" },
    { name: "Mutton Paye", price: 800, img: "food/paya.png" },
    { name: "Seekh Kebab", price: 320, img: "food/seekh_kebab.jpg" }
  ],

  BurgerExpress: [
    { name: "Club Sandwich", price: 400, img: "food/club_sandwich.png" },
    { name: "Chicken Strips", price: 800, img: "food/chickenstrips.png" },
    { name: "Loaded Fries", price: 350, img: "food/loadedfries.png" },
    { name: "Wrap", price: 460, img: "food/wrap.png" },
    { name: "Burger", price: 620, img: "food/burger.jpg" }
  ],

  SweetTooth: [
    { name: "Chocolate Brownie", price: 150, img: "food/brownie.png" },
    { name: "Cheesecake", price: 450, img: "food/cheesecake.png" },
    { name: "Lava Cake", price: 280, img: "food/lavacake.png" },
    { name: "Ice Cream", price: 460, img: "food/icecream.png" }
  ]
};

// Map URL parameter to restaurant name
const resMap = {
  italian: "ItalianoHub",
  desi: "DesiTarka",
  burger: "BurgerExpress",
  sweet: "SweetTooth"
};


const params = new URLSearchParams(window.location.search);
const resParam = params.get("res")?.toLowerCase();
const res = resMap[resParam];        

const menuDiv = document.getElementById("menuItems");

// Display menu items
// If restaurant not found, show error
if (!res || !menuData[res]) {
  menuDiv.innerHTML = `
    <div class="text-center text-danger fw-bold fs-4">
      Menu not found
    </div>`;
} else { // Loop through each menu item and create a card
  menuData[res].forEach(item => {
    menuDiv.innerHTML += `
      <div class="col-md-4">
        <div class="card menu-card h-100 shadow-sm">
          <img src="${item.img}" class="card-img-top" alt="${item.name}">
          <div class="card-body text-center">
            <h5 class="fw-bold">${item.name}</h5>
            <p class="text-muted">Rs ${item.price}</p>
            <button class="btn btn-success w-100"
              onclick='addToCart(${JSON.stringify(item)})'>
              Add to Cart
            </button>
          </div>
        </div>
      </div>`;
  });
}

//Cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];
updateCartCount();

function addToCart(item) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let existing = cart.find(p => p.name === item.name);

  if (existing) {
    existing.qty += 1;
  } else {
    item.qty = 1;
    cart.push(item);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}


function updateCartCount() {
  const cartCount = document.getElementById("cartCount");
  if (cartCount) {
    cartCount.innerText = cart.length;
  }
}


function getCart(){
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart){
    localStorage.setItem("cart", JSON.stringify(cart));
}

/* =========================
   ADD TO CART
========================= */
function addToCart(name, price){

    let cart = getCart();

    let existing = cart.find(item => item.name === name);

    if(existing){
        existing.qty += 1;
    } else {
        cart.push({
            id: Date.now(),
            name,
            price,
            qty: 1
        });
    }

    saveCart(cart);
    updateCartCount();
    showToast(name + " added to cart");
}

/* =========================
   CART COUNT
========================= */
function updateCartCount(){

    let cart = getCart();

    let totalQty = cart.reduce((sum,item) => sum + item.qty, 0);

    let countEl = document.getElementById("cartCount");
    if(countEl){
        countEl.innerText = totalQty;
    }
}

/* =========================
   DISPLAY CART
========================= */
function displayCart(){

    let cart = getCart();
    let container = document.getElementById("cartItems");

    if(!container) return;

    container.innerHTML = "";

    let total = 0;

    cart.forEach((item) => {

        total += item.price * item.qty;

        container.innerHTML += `
            <div class="cart-item">
                <div>
                    <h4>${item.name}</h4>
                    <p>₱${item.price}</p>
                </div>

                <div class="qty-controls">
                    <button onclick="changeQty(${item.id}, -1)">-</button>
                    <span>${item.qty}</span>
                    <button onclick="changeQty(${item.id}, 1)">+</button>
                </div>

                <button class="remove-btn" onclick="removeItem(${item.id})">
                    Remove
                </button>
            </div>
        `;
    });

    let totalEl = document.getElementById("total");
    if(totalEl){
        totalEl.innerText = "Total: ₱" + total;
    }

    updateCartCount();
    displayPreview();
}

/* =========================
   QUANTITY CONTROL (SAFE)
========================= */
function changeQty(id, change){

    let cart = getCart();

    let item = cart.find(i => i.id === id);

    if(!item) return;

    item.qty += change;

    if(item.qty <= 0){
        cart = cart.filter(i => i.id !== id);
    }

    saveCart(cart);
    displayCart();
}

/* =========================
   REMOVE ITEM
========================= */
function removeItem(id){

    let cart = getCart();
    cart = cart.filter(i => i.id !== id);

    saveCart(cart);
    displayCart();
}

/* =========================
   CHECKOUT (FAKE PAYMENT)
========================= */
function checkout(){

    let cart = getCart();

    if(cart.length === 0){
        alert("Cart is empty!");
        return;
    }

    let total = cart.reduce((sum,i)=> sum + i.price*i.qty,0);

    alert("Order placed! Total: ₱" + total);

    // clone cart safely (IMPORTANT)
    let cartCopy = JSON.parse(JSON.stringify(cart));

    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    orders.push({
        date: new Date().toLocaleString(),
        items: cartCopy,
        total: total
    });

    localStorage.setItem("orders", JSON.stringify(orders));

    // clear cart
    localStorage.removeItem("cart");

    updateCartCount();

    // go to order page
    window.location.href = "order.html";
}

/* =========================
   ORDER HISTORY
========================= */
function displayOrders(){

    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    let container = document.getElementById("orderHistory");

    if(!container) return;

    container.innerHTML = "";

    if(orders.length === 0){
        container.innerHTML = "<p>No orders yet 🛒</p>";
        return;
    }

    orders.slice().reverse().forEach(order => {

        container.innerHTML += `
            <div class="order-box">
                <h4>
                📦 Order #${order.orderId || "SMF-" + Date.now()}
                </h4>

                <p>
                🗓 ${order.date}
                </p>
                <p>Total: ₱${order.total}</p>
                <p>Payment:${order.payment}</p>
                <p>Status:${order.status}</p>
                <p>Order ID:${order.orderId}</p>

                <button class="btn" onclick="orderAgain()">
                    Order Again
                </button>
            </div>
        `;
    });
}

/* =========================
   TOAST
========================= */
function showToast(message){

    let toast = document.createElement("div");
    toast.className = "toast";
    toast.innerText = message;

    document.body.appendChild(toast);

    setTimeout(()=>toast.classList.add("show"),10);

    setTimeout(()=>{
        toast.classList.remove("show");
        setTimeout(()=>toast.remove(),300);
    },1500);
}

/* =========================
   INIT
========================= */
updateCartCount();

function displayPreview(){

    let cart = getCart();
    let container = document.getElementById("previewItems");

    if(!container) return;

    container.innerHTML = "";

    cart.forEach(item => {
        container.innerHTML += `
            <p>${item.name} x ${item.qty}</p>
        `;
    });
}

document.addEventListener("DOMContentLoaded", function () {
    displayCart();
});

function orderAgain(){
    window.location.href = "index.html";
}


/* =========================
   WISHLIST
========================= */

function getWishlist(){
    return JSON.parse(
        localStorage.getItem("wishlist")
    ) || [];
}

function saveWishlist(wishlist){
    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );
}

function addToWishlist(name, price){

    let wishlist = getWishlist();

    let exists = wishlist.find(
        item => item.name === name
    );

    if(exists){
        showToast("Already in wishlist ❤️");
        return;
    }

    wishlist.push({
        id: Date.now(),
        name,
        price
    });

    saveWishlist(wishlist);

    showToast(
        name + " added to wishlist ❤️"
    );
}

function displayWishlist(){

    let wishlist = getWishlist();

    let container =
        document.getElementById(
            "wishlistItems"
        );

    let empty =
        document.getElementById(
            "wishlistEmpty"
        );

    if(!container) return;

    container.innerHTML = "";

    if(wishlist.length === 0){

        if(empty){
            empty.style.display = "block";
        }

        return;
    }

    if(empty){
        empty.style.display = "none";
    }

    wishlist.forEach(item => {

        container.innerHTML += `

        <div class="cart-item">

            <div>

                <h3>${item.name}</h3>

                <p>
                    ₱${item.price}
                </p>

            </div>

            <div>

                <button
                    class="btn"
                    onclick="
                    addToCart(
                    '${item.name}',
                    ${item.price}
                    )"
                >
                    Add To Cart
                </button>

                <button
                    class="remove-btn"
                    onclick="
                    removeWishlistItem(
                    ${item.id}
                    )"
                >
                    Remove
                </button>

            </div>

        </div>

        `;
    });

}

function removeWishlistItem(id){

    let wishlist = getWishlist();

    wishlist = wishlist.filter(
        item => item.id !== id
    );

    saveWishlist(wishlist);

    displayWishlist();
}


/* =========================
   PAYMENT + VOUCHERS
========================= */

let discount = 0;

function getCartTotal(){

    let cart = getCart();

    return cart.reduce(
        (sum,item)=>
        sum + item.price * item.qty,
        0
    );
}

function loadPaymentTotal(){

    const cart =
    JSON.parse(localStorage.getItem("cart")) || [];

    let subtotal = 0;

    cart.forEach(item=>{

        subtotal +=
        item.price * item.qty;

    });

    const shipping = 99;

    let discount = 0;

    if(voucherDiscount === 10){

        discount =
        subtotal * 0.10;

    }else{

        discount =
        voucherDiscount;

    }

    const total =
    subtotal + shipping - discount;

    const subtotalEl =
    document.getElementById("subtotal");

    const discountEl =
    document.getElementById("discount");

    const totalEl =
    document.getElementById("paymentTotal");

    if(subtotalEl){
        subtotalEl.textContent =
        "₱" + subtotal.toLocaleString();
    }

    if(discountEl){
        discountEl.textContent =
        "-₱" + discount.toLocaleString();
    }

    if(totalEl){
        totalEl.textContent =
        "₱" + total.toLocaleString();
    }

}

function placeOrder(){

    let cart = getCart();

    if(cart.length === 0){

        alert("Cart is empty");

        return;
    }

    let paymentMethod =
        document.querySelector(
            'input[name="payment"]:checked'
        ).value;

    let total =
        getCartTotal() - discount;

    let statusList = [
        "Processing",
        "Shipped",
        "Delivered"
    ];

    let randomStatus =
        statusList[
            Math.floor(
                Math.random() *
                statusList.length
            )
        ];

    let orders =
        JSON.parse(
            localStorage.getItem("orders")
        ) || [];

    orders.push({

        orderId:
            "SMF" +
            Date.now(),

        date:
            new Date()
            .toLocaleString(),

        payment:
            paymentMethod,

        status:
            randomStatus,

        items:
            JSON.parse(
                JSON.stringify(cart)
            ),

        total:
            total

    });

    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );

    localStorage.removeItem(
        "cart"
    );

    alert(
        "Order placed successfully!"
    );

    window.location.href =
        "order.html";
}

function addProductQty(
    name,
    price,
    quantity
){

    let cart = getCart();

    let existing =
        cart.find(
            item =>
            item.name === name
        );

    if(existing){

        existing.qty += quantity;

    }else{

        cart.push({

            id: Date.now(),

            name,
            price,

            qty: quantity

        });

    }

    saveCart(cart);

    updateCartCount();

    showToast(
        quantity +
        " x " +
        name +
        " added"
    );

}

let voucherDiscount = 0;

function applyVoucher(){

    const code =
    document.getElementById("voucherInput")
    .value
    .trim()
    .toUpperCase();

    const msg =
    document.getElementById("voucherMessage");

    if(code === "SMURF10"){

        voucherDiscount = 10;

        msg.textContent =
        "✅ 10% discount applied";

    }

    else if(code === "WELCOME100"){

        voucherDiscount = 100;

        msg.textContent =
        "✅ ₱100 discount applied";

    }

    else{

        voucherDiscount = 0;

        msg.textContent =
        "❌ Invalid voucher";

    }

    loadPaymentTotal();

}
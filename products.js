const products = [

{
    id: 1,
    name: "Gaming Monitor",
    price: 7999,
    image: "images/gaming-monitor.jpg",
    category: "Gaming",
    seller: "Papa Smurf Tech",
    rating: 5,
    sold: "2.4k",
    topSeller:true,
},

{
    id: 2,
    name: "External SSD 1TB",
    price: 4299,
    image: "images/ssd.jpg",
    category: "Computers",
    seller: "Brainy Gadget Store",
    rating: 5,
    sold: "1.1k"
},

{
    id: 3,
    name: "USB-C Hub Pro",
    price: 899,
    image: "images/usb-hub.jpg",
    category: "Accessories",
    seller: "Smurf Village Electronics",
    rating: 4,
    sold: "800"
},

{
    id: 4,
    name: "Noise Cancelling Earbuds",
    price: 1599,
    image: "images/earbuds.jpg",
    category: "Audio",
    seller: "Harmony Audio",
    rating: 5,
    sold: "1.5k"
},

{
    id: 5,
    name: "Smartphone Stand Pro",
    price: 299,
    image: "images/cellphone-stand.jpg",
    category: "Accessories",
    seller: "Smurf Gadgets",
    rating: 4,
    sold: "3k"
},

{
    id: 6,
    name: "Gaming Desk",
    price: 6499,
    image: "images/gaming-desk.jpg",
    category: "Gaming",
    seller: "Papa Smurf Tech",
    rating: 5,
    sold: "900",
    topSeller:true
},

{
    id: 7,
    name: "Gaming Mouse",
    price: 799,
    image: "images/mouse.jpg",
    category: "Gaming",
    seller: "Papa Smurf Tech",
    rating: 5,
    sold: "1.2k"
},

{
    id: 8,
    name: "Mechanical Keyboard",
    price: 1499,
    image: "images/keyboard.jpg",
    category: "Gaming",
    seller: "Brainy Gadget Store",
    rating: 5,
    sold: "850"
},

{
    id: 9,
    name: "Wireless Headset",
    price: 1299,
    image: "images/wireless-headset.jpg",
    category: "Audio",
    seller: "Harmony Audio",
    rating: 5,
    sold: "1.7k"
},

{
    id: 10,
    name: "Smart Watch",
    price: 2499,
    image: "images/smartwatch.jpg",
    category: "Wearables",
    seller: "Smurf Wearables",
    rating: 4,
    sold: "1.4k"
},

{
    id: 11,
    name: "Gaming Chair",
    price: 5999,
    image: "images/gaming-chair.jpg",
    category: "Gaming",
    seller: "Papa Smurf Tech",
    rating: 5,
    sold: "650"
},

{
    id: 12,
    name: "RGB Mouse Pad",
    price: 399,
    image: "images/rgb-mousepad.jpg",
    category: "Gaming",
    seller: "Smurf Gadgets",
    rating: 4,
    sold: "2.2k"
},

{
    id: 13,
    name: "Bluetooth Speaker",
    price: 1099,
    image: "images/speaker.jpg",
    category: "Audio",
    seller: "Harmony Audio",
    rating: 5,
    sold: "1.9k"
},

{
    id: 14,
    name: "Phone Stand",
    price: 199,
    image: "images/phone-stand.jpg",
    category: "Accessories",
    seller: "Smurf Gadgets",
    rating: 4,
    sold: "4k"
},

{
    id: 15,
    name: "USB Hub",
    price: 499,
    image: "images/usb-hubv1.jpg",
    category: "Accessories",
    seller: "Brainy Gadget Store",
    rating: 4,
    sold: "2.6k"
},

{
    id: 16,
    name: "Webcam HD",
    price: 1799,
    image: "images/webcam.jpg",
    category: "Computers",
    seller: "Smurf Village Electronics",
    rating: 5,
    sold: "1k"
}

];

function renderProducts() {

    const container =
    document.getElementById("productGrid");

    if(!container) return;

    container.innerHTML = "";

    products.forEach(product => {

        container.innerHTML += `

        <div class="card"
            onclick="window.location.href='product.html?id=${product.id}'">

                ${product.topSeller ? `
                <div class="top-seller">
                    TOP SELLER
                </div>
                ` : ""}

            <img src="${product.image}" alt="${product.name}">

            <div class="card-body">

                <h3>${product.name}</h3>

                <p class="seller">
                    ${product.seller}
                    • Sold ${product.sold || 0}
                </p>

                <div class="rating">
                    ${"⭐".repeat(product.rating || 5)}
                </div>

                <div class="price-row">

    <span class="price">
        ₱${Number(product.price).toLocaleString()}
    </span>

    <span class="shipping">
        🚚 Free Shipping
    </span>

</div>

            <div class="card-actions">

                    <button
                    class="wishlist-btn"
                    onclick="
                    event.stopPropagation();
                    handleHomeWishlist(
                    '${product.name}',
                    ${product.price}
                    )">

                        ❤️

                    </button>

                    <button
                    class="add-cart-btn"
                    onclick="
                    event.stopPropagation();
                    handleHomeCart(
                    '${product.name}',
                    ${product.price}
                    )">

                        Add to Cart

                    </button>

                </div>

            </div>

        </div>

        `;

    });

}

document.addEventListener(
    "DOMContentLoaded",
    renderProducts
);

function filterCategory(category){

    const container = document.getElementById("productGrid");

    if(!container) return;

    // Scroll to products
    document.getElementById("products").scrollIntoView({
        behavior: "smooth"
    });

    // Filter products
    const filteredProducts =
        category === "All"
        ? products
        : products.filter(product => product.category === category);

    container.innerHTML = "";

    filteredProducts.forEach(product => {

        container.innerHTML += `

        <div class="card"
        onclick="window.location.href='product.html?id=${product.id}'">

            ${product.topSeller ? `
            <div class="top-seller">
                TOP SELLER
            </div>` : ""}

            <img src="${product.image}" alt="${product.name}">

            <div class="card-body">

                <h3>${product.name}</h3>

                <p class="seller">
                    ${product.seller} • Sold ${product.sold || 0}
                </p>

                <div class="rating">
                    ${"⭐".repeat(product.rating)}
                </div>

                <div class="price-row">

                    <span class="price">
                        ₱${Number(product.price).toLocaleString()}
                    </span>

                    <span class="shipping">
                        🚚 Free Shipping
                    </span>

                </div>

                <div class="card-actions">

                    <button
                        class="wishlist-btn"
                        onclick="event.stopPropagation(); handleHomeWishlist('${product.name}', ${product.price})">
                        ❤️
                    </button>

                    <button
                        class="add-cart-btn"
                        onclick="event.stopPropagation(); handleHomeCart('${product.name}', ${product.price})">
                        Add to Cart
                    </button>

                </div>

            </div>

        </div>

        `;
    });

}


function handleHomeCart(name, price){

    if(!window.currentUser){

        alert(
            "Please login first to add items to cart."
        );

        window.location.href =
            "login.html";

        return;
    }

    addToCart(name, price);

}


function handleHomeWishlist(name, price){

    if(!window.currentUser){

        alert(
            "Please login first to use wishlist."
        );

        window.location.href =
            "login.html";

        return;
    }

    addToWishlist(name, price);

}

window.products = products;

window.renderProducts =
renderProducts;

window.filterCategory =
filterCategory;


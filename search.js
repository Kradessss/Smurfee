document.addEventListener("DOMContentLoaded", () => {

    const searchInput =
        document.getElementById("searchInput");

    if (!searchInput) return;

    searchInput.addEventListener("input", () => {

        const keyword =
            searchInput.value
            .toLowerCase()
            .trim();

        const container =
            document.getElementById("productGrid");

        if (!container) return;

        container.innerHTML = "";

        const filtered =
            products.filter(product =>

                product.name
                .toLowerCase()
                .includes(keyword)

                ||

                product.category
                .toLowerCase()
                .includes(keyword)

                ||

                product.seller
                .toLowerCase()
                .includes(keyword)

            );

        filtered.forEach(product => {

            container.innerHTML += `

            <div class="card"
            onclick="window.location.href='product.html?id=${product.id}'">

                <img src="${product.image}">

                <div class="card-body">

                    <h3>${product.name}</h3>

                    <div class="rating">
                        ${"⭐".repeat(product.rating)}
                    </div>

                    <p class="seller">
                        ${product.seller}
                    </p>

                    <p class="price">
                        ₱${product.price}
                    </p>

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
                        class="btn"
                        onclick="
                        event.stopPropagation();
                        handleHomeCart(
                        '${product.name}',
                        ${product.price}
                        )">
                        Add To Cart
                        </button>

                    </div>

                </div>

            </div>

            `;

        });

    });

});

// existing search code above...

let selectedColor = "";

function toggleFilters(){

    const panel =
    document.getElementById("browsePanel");

    if(!panel) return;

    panel.classList.toggle("show");

}

function updatePrice(value){

    const priceText =
    document.getElementById("priceValue");

    if(priceText){

        priceText.textContent =
        "₱" + Number(value).toLocaleString();

    }

    applyFilters();

}

function selectColor(color){

    selectedColor = color;

    applyFilters();

}

function applyFilters(){

    const keyword =
    document.getElementById("browseSearch")
    ?.value
    .toLowerCase()
    .trim() || "";

    const category =
    document.getElementById("categoryFilter")
    ?.value || "";

    const brand =
    document.getElementById("brandFilter")
    ?.value || "";

    const maxPrice =
    Number(
        document.getElementById("priceFilter")
        ?.value || 99999999
    );

    const filtered =
    products.filter(product=>{

        const matchesSearch =

            product.name
            .toLowerCase()
            .includes(keyword)

            ||

            product.category
            .toLowerCase()
            .includes(keyword)

            ||

            product.seller
            .toLowerCase()
            .includes(keyword);

        const matchesCategory =

            !category ||

            product.category === category;

        const matchesBrand =

            !brand ||

            product.seller === brand;

        const matchesPrice =

            product.price <= maxPrice;

        return (

            matchesSearch &&
            matchesCategory &&
            matchesBrand &&
            matchesPrice

        );

    });

    renderFilteredProducts(filtered);

}

function renderFilteredProducts(filteredProducts){

    const container =
    document.getElementById("productGrid");

    if(!container) return;

    container.innerHTML = "";

    filteredProducts.forEach(product=>{

        container.innerHTML += `

        <div class="card"
        onclick="window.location.href='product.html?id=${product.id}'">

            <img src="${product.image}">

            <div class="card-body">

                <h3>${product.name}</h3>

                <div class="rating">
                    ${"⭐".repeat(product.rating)}
                </div>

                <p class="sold">
                    Sold ${product.sold}
                </p>

                <p class="seller">
                    ${product.seller}
                </p>

                <p class="shipping">
                    🚚 Free Shipping
                </p>

                <p class="price">
                    ₱${product.price}
                </p>

            </div>

        </div>

        `;

    });

}

window.toggleFilters = toggleFilters;
window.applyFilters = applyFilters;
window.updatePrice = updatePrice;
window.selectColor = selectColor;
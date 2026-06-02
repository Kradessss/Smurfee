document.addEventListener("DOMContentLoaded", () => {

    const searchInput =
        document.getElementById("searchInput");

    if(!searchInput) return;

    searchInput.addEventListener("input", function(){

        const value =
            this.value.toLowerCase();

        const cards =
            document.querySelectorAll(".card");

        cards.forEach(card => {

            const title =
                card.querySelector("h3")
                .textContent
                .toLowerCase();

            const seller =
                card.querySelector(".seller")
                ?.textContent
                .toLowerCase() || "";

            if(
                title.includes(value) ||
                seller.includes(value)
            ){
                card.style.display = "";
            }
            else{
                card.style.display = "none";
            }

        });

    });

});


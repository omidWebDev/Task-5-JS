// http://localhost:3000/products

const searchInput = document.querySelector("#search");
const productsDom = document.querySelector(".product-center");
const btns = document.querySelectorAll(".btn");
let allProductsData = [];
const filters = {
  searchItems: "",
};

document.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000/products")
    .then((res) => {
      allProductsData = res.data;
      renderProducts(res.data, filters);
    })
    .catch((err) => console.log(err));
});

function renderProducts(_products, _filters) {
  const filteredProducts = _products.filter((p) => {
    return p.name.toLowerCase().includes(_filters.searchItems.toLowerCase());
  });

  productsDom.innerHTML = "";
  filteredProducts.forEach((item, index) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
      <div class="product-image">
        <img src="${item.image}" style="width:200px; height:200px" alt="p-${index}">
      </div>
      <div class="product-detail">
        <span class="product__price">${item.price}</span>
        <span class="product__text">${item.name}</span>
      </div> 
    `;
    productsDom.appendChild(productDiv);
  });
}

searchInput.addEventListener("input", (e) => {
  filters.searchItems = e.target.value;
  renderProducts(allProductsData, filters);
});

btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const filter = e.target.dataset.filter;
    filters.searchItems = filter;
    renderProducts(allProductsData, filters);
  });
});

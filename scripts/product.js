const handleSlider = (event) => {
  const slider = document.querySelector("#filter-slider-id");
  slider.value = event.target.value;

  const label = document.querySelector("#label-slider-id");
  label.textContent = `$${event.target.value}`;
};

const handlePriceFilter = () => {
  const slider = document.querySelector("#filter-slider-id");
  const category = getQueryParam("category");

  const { origin, pathname } = window.location;
  window.location.href =
    `${origin}${pathname}?maxPrice=${slider.value}` +
    (category ? `&category=${category}` : "");
};

const handleSelectCategory = (event) => {
  const anchor = event.target.closest(".filter-category-option > a");
  if (anchor) {
    const maxPrice = getQueryParam("maxPrice");
    const { origin, pathname } = window.location;
    window.location.href =
      `${origin}${pathname}?category=${anchor.textContent}` +
      (maxPrice ? `&maxPrice=${maxPrice}` : "");
  }
};

const getQueryParam = (key) => {
  const params = new URLSearchParams(window.location.search);
  return params.has(key) ? params.get(key) : undefined;
};

const eventListenersConfig = [
  {
    id: "#filter-slider-id",
    action: "input",
    function: handleSlider,
  },
  {
    id: "#btn-filter-id",
    action: "click",
    function: handlePriceFilter,
  },
  {
    id: "#filter-category-list-id",
    action: "click",
    function: handleSelectCategory,
  },
];

const setupEventListeners = () => {
  for (let config of eventListenersConfig) {
    const element = document.querySelector(config.id);
    element.addEventListener(config.action, config.function, false);
  }
};

const fetchProducts = async (category, maxPrice) => {
  const response = await fetch("/mock-data/products.json");
  const data = await response.json();
  return data.products.filter((product) => {
    return (
      (!category ||
        product.category.toLowerCase() === category.toLowerCase()) &&
      (!maxPrice || product.price <= maxPrice)
    );
  });
};

const fetchBestSellers = async () => {
  const response = await fetch("/mock-data/products.json");
  const data = await response.json();
  return data.products
    .filter((product) => product.bestSeller)
    .sort(() => (Math.random() > 0.5 ? 1 : -1));
};

const renderProductCards = (products, parentSelector, childSelector) => {
  const productCardList = document.querySelector(`.${parentSelector}`);
  for (let product of products) {
    const listItem = document.createElement("li");
    listItem.classList.add(childSelector);
    listItem.innerHTML = `
      <a href="#">
        <img
          class="product-image"
          src="${product.image}"
        />
      </a>
      <div>
        <a href="#">
          <h4 class="product-name">${product.name}</h4>
        </a>
        <span class="product-category">${product.category}</span>
        <span class="product-price">${product.price}.00</span>
      </div>
    `;
    productCardList.appendChild(listItem);
  }
};

const main = async () => {

  const category = getQueryParam("category");
  const maxPrice = getQueryParam("maxPrice");

  handleSlider({ target: { value: maxPrice } });

  const products = await fetchProducts(category, maxPrice);
  renderProductCards(products, "product-card-list", "product-card");

  const bestSellers = await fetchBestSellers();
  renderProductCards(
    bestSellers,
    "mini-product-card-list",
    "mini-product-card"
  );

  setupEventListeners();
};

main();

const handleSlider = (event) => {
  const label = document.querySelector("#label-slider-id");
  label.textContent = `$${event.target.value}`;
};

const handlePriceFilter = () => {
  const slider = document.querySelector("#filter-slider-id");
  const { origin, pathname } = window.location;
  const queryParams = objToQueryParam({
    ...queryParamToObj(),
    maxPrice: slider.value,
  });

  window.location.href = `${origin}${pathname}?${queryParams}`;
};

const handleSelectCategory = (event) => {
  const anchor = event.target.closest(".filter-category-option > a");
  if (anchor) {
    const { origin, pathname } = window.location;
    const queryParams = objToQueryParam({
      ...queryParamToObj(),
      category: anchor.textContent,
    });
    window.location.href = `${origin}${pathname}?${queryParams}`;
  }
};

const handleSearchProduct = () => {
  const prodName = document.querySelector("#filter-search-text-id");
  const { origin, pathname } = window.location;
  const queryParams = objToQueryParam({
    ...queryParamToObj(),
    prodName: prodName.value,
  });
  window.location.href = `${origin}${pathname}?${queryParams}`;
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
  {
    id: "#filter-search-btn-id",
    action: "click",
    function: handleSearchProduct,
  },
];

const queryParamToObj = () => {
  const currentFilters = { maxPrice: 1000, prodName: "" };
  const params = new URLSearchParams(window.location.search);
  params.forEach((value, key) => {
    currentFilters[key] = value;
  });
  return currentFilters;
};

const objToQueryParam = (obj) => {
  const url = Object.keys(obj)
    .map((key) => {
      const value = obj[key];
      return `${key}=${value}`;
    })
    .filter((param) => param != "")
    .join("&");

  return url;
};

const setupEventListeners = () => {
  for (let config of eventListenersConfig) {
    const element = document.querySelector(config.id);
    element.addEventListener(config.action, config.function, false);
  }
};

const fetchProducts = async (category, maxPrice, prodName) => {
  const response = await fetch("/mock-data/products.json");
  const data = await response.json();
  return data.products.filter((product) => {
    return (
      (!category ||
        product.category.toLowerCase() === category.toLowerCase()) &&
      (!maxPrice || product.price <= maxPrice) &&
      (!prodName || product.name.toLowerCase().includes(prodName.toLowerCase()))
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

const loadCurrentQueryParams = () => {
  const currConfig = queryParamToObj();
  document.querySelector("#filter-search-text-id").value = currConfig.prodName;
  document.querySelector("#filter-slider-id").value = currConfig.maxPrice;
  document.querySelector(
    "#label-slider-id"
  ).textContent = `$${currConfig.maxPrice}`;
  document.querySelector("#result-count-id").textContent = `Results for ${
    currConfig.category ? currConfig.category.toLowerCase() : ""
  } items below $${currConfig.maxPrice}`;
  return currConfig;
};

const main = async () => {
  const { category, maxPrice, prodName } = loadCurrentQueryParams();
  const products = await fetchProducts(category, maxPrice, prodName);
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

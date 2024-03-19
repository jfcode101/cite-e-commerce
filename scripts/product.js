const handleSlider = () => {
  const slider = document.querySelector('#filter-slider-id');
  const label = document.querySelector('#label-slider-id');
  label.textContent = `$${slider.value}`
}

const eventListenersConfig = [
  {
    id: '#filter-slider-id',
    action: 'input',
    function: handleSlider,
  }
]

const setupEventListeners = () => {
  for (let config of eventListenersConfig) {
    const element = document.querySelector(config.id);
    element.addEventListener(config.action, config.function, false)
  }
}

const fetchProducts = async () => {
  const response = await fetch("/mock-data/products.json");
  const data = await response.json();
  return data.products;
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
  const products = await fetchProducts();
  renderProductCards(
    products,
    "product-card-list",
    "product-card"
  );

  const bestSellers = await fetchBestSellers();
  renderProductCards(
    bestSellers,
    "mini-product-card-list",
    "mini-product-card"
  );
  
  setupEventListeners();

};



main();

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
  const productCardList = document.querySelector(parentSelector);
  const firstProductCard = productCardList.querySelector(childSelector);

  masterElement = firstProductCard.cloneNode(true);

  while (productCardList.firstChild) {
    productCardList.removeChild(productCardList.firstChild);
  }

  for (let product of products) {
    const copy = masterElement.cloneNode(true);
    copy.querySelector(".product-image").src = product.image;
    copy.querySelector(".product-name").textContent = product.name;
    copy.querySelector(".product-category").textContent = product.category;
    copy.querySelector(".product-price").textContent = `$${product.price}.00`;
    productCardList.appendChild(copy);
  }
};

const main = async () => {
  const products = await fetchProducts();
  renderProductCards(products, ".product-card-list", ".product-card");

  const bestSellers = await fetchBestSellers();
  renderProductCards(
    bestSellers,
    ".mini-product-card-list",
    ".mini-product-card"
  );
  
  setupEventListeners();

};



main();

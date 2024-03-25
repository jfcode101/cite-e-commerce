const template = `
  <link rel="stylesheet" href="./styles/footer.css" />
  <footer class="cls-footer">
    <section class="cls-footer-section">
      <div class="wrapper cls-title">
        LOREM IPSUM DOLOR SIT AMET CONSECTETUR, ADIPISICING ELIT ALIQUAM
        INVENTORE REPUDIANDAE.
      </div>
    </section>
    <section class="cls-footer-section">
      <div class="wrapper space-middle">
        <div class="cls-column">
          <img
            src="https://my-awesome-react-project.netlify.app/img/logo.svg"
            width="150px"
            alt="Logo"
            class="cls-logo"
          />
          <span class="cls-title">
            Lorem ipsum dolor sit amet consectetur.</span
          >
        </div>
        <div class="cls-column">
          <span class="cls-title">Essentials</span>
          <ul class="cls-quick-links">
            <li>Clothing items</li>
            <li>Men shoes</li>
            <li>Women shoes</li>
            <li>Unisex Caps</li>
            <li>Fornitures</li>
          </ul>
        </div>
        <div class="cls-column">
          <span class="cls-title">Leasure</span>
          <ul class="cls-quick-links">
            <li>Electronics</li>
            <li>Gaming</li>
            <li>Sport accessories</li>
            <li>Music</li>
            <li>Miscellaneous</li>
          </ul>
        </div>
        <div class="cls-column cls-subscribe-form">
          <span class="cls-title">Subscribe</span>
          <input
            type="text"
            name=""
            id=""
            placeholder="Your email address..."
          />
          <button>Subscribe</button>
        </div>
      </div>
    </section>
    <section class="cls-footer-section">
      <div class="wrapper space-middle">
        <span>Copyright © 2024 Brandstore. Powered by Brandstore.</span>
        <ul class="cls-footer-social">
          <li><a href="#" class="fa fa-facebook"></a></li>
          <li><a href="#" class="fa fa-youtube-play"></a></li>
          <li><a href="#" class="fa fa-twitter"></a></li>
          <li><a href="#" class="fa fa-instagram"></a></li>
          <li><a href="#" class="fa fa-google"></a></li>
        </ul>
      </div>
    </section>
  </footer>
`;

class CommonFooterElement extends HTMLElement {
  static define(tagName = "common-footer") {
    customElements.define(tagName, this);
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = template;
  }
}

CommonFooterElement.define();

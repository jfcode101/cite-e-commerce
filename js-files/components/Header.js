// create template that will pass info into the shadowRoot
const tmplt = document.createElement("template");

tmplt.innerHTML = `
<link rel="stylesheet" href="../styles/index.css"  type="text/css">
<link
rel="stylesheet"
href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
/>
<header class="cls-main-header">
      <nav class="cls-navbar">
        <div class="cls-logo">
          <span id="id-upper"><span id="id-small">e-</span>CITE</span>
        </div>
        <input type="checkbox" id="id-check" />
        <label for="id-check" class="cls-check">
          <span class="material-symbols-rounded" id="id-menu">menu</span>
          <span class="material-symbols-rounded" id="id-close">close</span>
        </label>

        <section class="cls-nav-sect">
          <a href="#" class="cls-nav-sect-link">
            <span class="material-symbols-rounded"> person </span>
          </a>
          <p id="id-para-sect">$0.00</p>
        </section>
        <ul class="cls-nav-list">
          <li class="cls-nav-item">
            <a href="#" class="cls-nav-link">PRODUCTS</a>
          </li>
          <li class="cls-nav-item">
            <a href="#" class="cls-nav-link">ABOUT</a>
          </li>
          <li class="cls-nav-item">
            <a href="#" class="cls-nav-link">CONTACT US</a>
          </li>
        </ul>
      </nav>
</header>

`;

export class Header extends HTMLElement {
  constructor() {
    super();
    // #1: attach shadow tree and returns shadow root reference
    // #2:create a shadow root
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(tmplt.content.cloneNode(true));
  }

  connectedCallback() {
    this.clickListener();
  }

  disconnectedCallback() {}

  clickListener() {
    this.shadowRoot
      .querySelector(".cls-check")
      .addEventListener("click", (e) => {
        this.toggle(e);
      });
  }

  toggle(e) {
    if (e.target.textContent === "menu") {
      e.target.style.display = "none";
      e.target.nextElementSibling.style.display = "block";
    } else {
      e.target.previousElementSibling.style.display = "block";
      e.target.style.display = "none";
    }
  }
}

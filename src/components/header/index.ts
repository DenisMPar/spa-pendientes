customElements.define(
  "header-el",
  class Header extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      this.render();
    }
    render() {
      const textoOriginal = this.textContent;
      const style = document.createElement("style");
      style.innerHTML = `
                    .header{
                        width:100%;
                        height:60px;
                        background-color:#FF8282;
                        display:flex;
                        justify-content:center;
                        align-items:center;
                    }
                `;
      const header = document.createElement("header");
      header.className = "header";
      header.textContent = textoOriginal;

      this.shadow.appendChild(style);
      this.shadow.appendChild(header);
    }
  }
);

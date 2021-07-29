customElements.define(
  "text-el",
  class Text extends HTMLElement {
    shadow: ShadowRoot;
    types: string[] = ["body", "title", "large"];
    type: string = "body";
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      if (this.types.includes(this.getAttribute("type"))) {
        this.type = this.getAttribute("type");
      }
      this.render();
    }
    render() {
      const textoOriginal = this.textContent;
      var style = document.createElement("style");
      style.innerHTML = `
           *{
             margin:0
           }
           .body{          
              font-weight: normal;
              font-size: 18px;
           }
           .title{           
              font-weight: bold;
              font-size: 52px;
           }
           .large{         
              font-weight: 500;
              font-size: 22px;           
           }
        `;
      if (this.type == "body") {
        const p = document.createElement("p");
        p.textContent = textoOriginal;
        p.className = "body";
        this.shadow.appendChild(p);
      }
      if (this.type == "title") {
        const title = document.createElement("h1");
        title.textContent = textoOriginal;
        title.className = "title";
        this.shadow.appendChild(title);
      }
      if (this.type == "large") {
        const p = document.createElement("p");
        p.textContent = textoOriginal;
        p.className = "large";
        this.shadow.appendChild(p);
      }

      this.shadow.appendChild(style);
    }
  }
);

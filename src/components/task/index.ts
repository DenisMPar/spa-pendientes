customElements.define(
  "task-el",
  class Task extends HTMLElement {
    shadow: ShadowRoot;
    text: string;
    checked: boolean;
    deleted: boolean;
    itemId: number;
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      this.text = this.getAttribute("text") || "";
      if (this.hasAttribute("checked")) {
        this.checked = true;
      }
      this.itemId = parseInt(this.getAttribute("id"));
      this.render();
    }
    render() {
      const style = document.createElement("style");
      style.innerHTML = `
      *{
        box-sizing: border-box;
      }
      .root{
        width:100%;
        min-height:112px;
        height:100%;
        background-color:#FFF599;
        display: grid;
        grid-template-columns: 4fr 1fr;
        grid-template-rows: 1fr 1fr;
        padding:15px;
    }
    .titulo{
      width:100%;
      margin: 0;
      
      font-family: inherit;
      font-size: 18px;
    }
    .titulo.checked{
      text-decoration: line-through;
    }
    .container-title{
      width:100%;
      grid-row: 1 / 3;
      display:flex;
    }
    .input{
      width:21px;
      height:21px;
      justify-self: end;
      margin:0;
    }
    .delete-button{
      width:auto;
      height:22px;
      padding:0;
      justify-self: end;
      align-self: end;
     background: none;
     border: none;
    }
    

    `;
      const imageURL = require("url:../../img/delete.svg");
      this.shadow.innerHTML = `
      <div class="root">
      <div class="container-title">
      <h4 class="titulo ${this.checked ? "checked" : ""}">${this.text}</h4>
      </div>
      <input class="input" type="checkbox" ${this.checked ? "checked" : ""}>
      <button class="delete-button">
      <img src="${imageURL}">
      </button>
      </div>
      `;
      //custom event que escucha cuando se activa el checkbox de completed
      const checkboxEl = this.shadow.querySelector(".input");
      checkboxEl.addEventListener("click", (e) => {
        const eventCompleted = new CustomEvent("completed", {
          detail: {
            id: this.id,
            completed: e.target.checked,
          },
        });
        this.dispatchEvent(eventCompleted);
      });
      //custom event que escucha cuando se borra la tarea
      const buttonEl = this.shadow.querySelector(".delete-button");
      buttonEl.addEventListener("click", (e) => {
        const eventDeleted = new CustomEvent("deleted", {
          detail: {
            id: this.id,
            deleted: true,
          },
        });
        this.dispatchEvent(eventDeleted);
      });
      this.shadow.appendChild(style);
    }
  }
);

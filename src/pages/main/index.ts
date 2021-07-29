import { state } from "../../state";
import * as sort from "lodash/sortBy";
export function initPageMain(container) {
  const div = document.createElement("div");
  div.innerHTML = ` 
  <header-el></header-el>
  <div class="main__container">
  <div class="main__title-container">
  <text-el type="title">Mis Pendientes</text-el>
  </div>
  <div class="main__form-container">
  <form-el class="form" label = "Pendientes"></form-el>
  </div>
  <ul class="tasks__list">
  </ul>
  </div>
  `;

  //selecciona la lista contenedora de tasks y le agrega los task haciendo una iteracion de los task activos
  function createTask() {
    const activeTasks = state.getActiveTasks();
    const orderByCompleted = sort(activeTasks, ["completed"]);

    const ulEl = div.querySelector(".tasks__list");
    ulEl.innerHTML = "";
    for (const t of orderByCompleted) {
      const taskContainer = document.createElement("div");
      taskContainer.innerHTML = `
       <task-el text="${t.text}" ${t.completed ? "checked" : ""} id=${
        t.id
      } ><task-el>
       `;

      taskContainer
        .querySelector("task-el")
        .addEventListener("completed", (e) => {
          const event = e as any;
          state.changeItemCompleted(event.detail);
        });
      taskContainer
        .querySelector("task-el")
        .addEventListener("deleted", (e) => {
          const event = e as any;
          state.changeItemDeleted(event.detail);
        });
      ulEl.appendChild(taskContainer);
    }
  }
  //busca el form en el shadowroot para agregarle un evento submit
  const formEl = div.querySelector(".form");
  const shadowForm = formEl.shadowRoot.querySelector("form");
  shadowForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const target = e.target as any;
    state.addTask(target.task.value);
  });
  //cada vez que el estado cambia, borra todos los task y los reimprime con los cambios
  state.subscribe(() => {
    createTask();
  });

  createTask();
  container.appendChild(div);
}

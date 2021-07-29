const state = {
  data: {
    tasks: [],
  },
  listeners: [],
  getState() {
    return this.data;
  },
  //devuelve los task activos
  getActiveTasks() {
    const currentState = this.getState();
    const tasks = currentState.tasks.filter((t) => t.deleted == false);
    return tasks;
  },
  //agrega un task al estado
  addTask(text) {
    const currentState = this.getState();
    currentState.tasks.push({
      text,
      completed: false,
      deleted: false,
      id: currentState.tasks.length,
    });
    this.setState(currentState);
  },
  //setea un nuevo estado y a la vez guarda una copia en local storage
  setState(newState) {
    this.data = newState;
    for (const cb of this.listeners) {
      cb();
    }
    localStorage.setItem("state", JSON.stringify(newState));
  },
  changeItemCompleted(params) {
    const currentState = this.getState();
    for (const i of currentState.tasks) {
      if (i.id == params.id) {
        i.completed = params.completed;
      }
    }
    this.setState(currentState);
  },
  changeItemDeleted(params) {
    const currentState = this.getState();
    for (const i of currentState.tasks) {
      if (i.id == params.id) {
        i.deleted = params.deleted;
      }
    }
    this.setState(currentState);
  },
  subscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },
};
(function () {
  //sincroniza el state con el localstorage si es que existiera uno
  const localState = localStorage.getItem("state");
  if (localState) {
    state.data = JSON.parse(localState);
  }
})();
export { state };

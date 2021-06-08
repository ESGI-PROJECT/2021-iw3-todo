import { html, css } from 'lit';

import Base from '../Base.js';

class TaskList extends Base {

  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  static get properties() {
    return {
      todos: Array,
      _todo: {
        type: String,
        state: true
      }
    };
  }

  constructor() {
    super();
    this.todos = [];
    this._todo = '';
  }

  handleForm(e) {
    e.preventDefault();
    if (this._todo === '') return console.log('[todo] Value is required !!!');
    const todo = {
      id: Date.now(),
      title: this._todo,
      synced: 1,
      updated: 0,
      done: 0,
      deleted: 0,
      date: Date.now()
    };

    this.dispatchEvent(new CustomEvent('create-todo', {
      detail: todo
    }));
    this._todo = '';
  }

  displayTodo() {
    return html`
      <div>
        <header>
          <h1 class="mt-2 px-4 text-xl">My awesome todos : </h1>
        </header>
        <main class="todolist px-4 pb-20">
          <ul>
            <!-- ${this.todos.map(todo => html`<task-card
              @update-todo="${this.handleUpdate}"
              @delete-todo="${this.handleDelete}"
              .todo="${todo}"></task-card>`)} -->

            ${this.todos.map(todo => html`<li>${todo.title}</li>`)}
          </ul>
        </main>
      </div>
    `;
  }

  displayNoTodo() {
    return html`
      <div class="mt-8">
        <img class="object-contain px-20" src="./assets/img/nodata.svg" alt="No data">
        <p class="mt-4 text-center text-xl">No todos yet, try to create a new one</p>
      </div>
    `;
  }

  render() {
    return html`
      <section>
        ${this.todos.length ? this.displayTodo() : null}
        ${!this.todos.length ? this.displayNoTodo() : null}
        <footer class="h-16 bg-gray-300 fixed bottom-0 inset-x-0">
          <form @submit="${this.handleForm}" class="w-full h-full flex justify-between items-center px-4 py-3">
            <label class="flex-1" aria-label="Add todo input">
              <input
                autocomplete="off"
                .value="${this._todo}"
                @input="${e => this._todo = e.target.value}"
                class="py-3 px-4 rounded-sm w-full h-full"
                type="text"
                placeholder="Enter a new todo ..."
                name="todo">
            </label>
            <button
              aria-label="Add"
              class="ml-4 rounded-lg text-uppercase bg-indigo-600 h-full text-center px-3 uppercase text-white font-bold flex justify-center items-center"
              type="submit">Add</button>
          </form>  
        </footer>
      </section>
    `;
  }
}

customElements.define('task-list', TaskList);

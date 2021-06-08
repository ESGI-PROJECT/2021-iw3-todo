import { html, css } from 'lit';
import { createTodo, fetchTodos } from './api/todos.js';

import Base from './Base.js';
import { getTodos, setTodo, setTodos } from './idb.js';
import checkConnectivity from './network.js';

class TaskApp extends Base {

  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  static get properties() {
    return {
      isOnline: {
        type: Boolean,
        state: true
      },
      todos: {
        type: Array,
        state: true
      }
    };
  }

  constructor() {
    super();
    this.isOnline = true;
    this.todos = [];
  }

  async firstUpdated() {
    checkConnectivity();
    document.addEventListener('connection-changed', ({ detail: isOnline }) => {
      this.isOnline = isOnline;
    });

    if (this.isOnline && navigator.onLine) {
      const todos = await fetchTodos();
      this.todos = await setTodos(todos);
    } else {
      this.todos = await getTodos() || [];
    }
  }

  async handleCreate({ detail: todo }) {
    await setTodo(todo);
    if (this.isOnline && navigator.onLine) {
      await createTodo(todo);
      return this.todos = await getTodos();
    }
    todo.synced = 0;
    this.todos = await setTodo(todo);
  }

  render() {
    return html`
      <section class="relative">
        <header class="h-14 bg-indigo-600 flex items-center justify-center text-white">
          <h1 class="text-2xl"><a href="/">Fire Task 🚀</a></h1>
        </header>
        <main>
          <task-list
            .todos="${this.todos}"
            @create-todo="${this.handleCreate}"
          ></task-list>
        </main>
      </section>
    `;
  }
}

customElements.define('task-app', TaskApp);

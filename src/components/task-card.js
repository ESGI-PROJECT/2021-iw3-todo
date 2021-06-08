import {
  html,
  css
} from 'lit';

import Base from '../Base.js';

class TaskCard extends Base {

  static get styles() {
    return css `
      :host {
        display: block;
      }
    `;
  }

  static get properties() {
    return {
      todo: Object
    };
  }

  constructor() {
    super();
    this.todo = {};
  }

  deleteItem() {
    const event = new CustomEvent('delete-todo', {
      detail: this.todo
    });
    this.dispatchEvent(event);
  }

  updateItem() {
    this.todo.done = this.todo.done === 1 ? 0 : 1;
    const event = new CustomEvent('update-todo', {
      detail: this.todo
    });
    this.dispatchEvent(event);
  }

  render() {
    return html `
    <style>
      input:checked + svg {
        display: block;
      }
    </style> 
    <section class="toto-card mt-4 px-4 py-3 bg-gray-300 rounded-lg flex items-center shadow-sm">
      <aside>
        <label class="flex justify-start items-start" tabindex="0" aria-label="Check todo">
          <div class="bg-white border-2 rounded border-gray-400 w-6 h-6 flex flex-shrink-0 justify-center items-center focus:border-blue-500">
            <input type="checkbox" name="todo[]" class="opacity-0 absolute" tabindex="0"  ?checked="${this.todo.done === 1}" @change=${this.updateItem}>
            <svg class="fill-current hidden w-4 h-4 text-green-500 pointer-events-none" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>
          </div>
        </label>
      </aside>
      <main class="flex-1 ml-2 truncate">
        <a class="block font-bold text-gray-900 truncate" href="${`/todos/${this.todo.id}`}">${this.todo.title}</a>
        <p class="text-gray-300">${this.todo.description}</p>
      </main>
      ${ this.todo.synced === 0 || this.todo.updated === 1 ? html`
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      ` : '' }
      <button @click="${this.deleteItem}" class="ml-2 text-red-600" aria-label="Delete">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </section>
    `;
  }
}

customElements.define('task-card', TaskCard);
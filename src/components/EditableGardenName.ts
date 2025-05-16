import { store } from '../store/GlobalState';

class EditableGardenName extends HTMLElement {
  connectedCallback() {
    const name = store.getState().gardenName;

    this.innerHTML = `
      <div class="name-container">
        <h1 id="garden-name">${name}</h1>
        <button id="edit-name">Editar nombre</button>
      </div>
    `;

    this.querySelector('#edit-name')?.addEventListener('click', () => {
      const newName = prompt('Nuevo nombre del jardín:', name);
      if (newName) {
        store.setState({ gardenName: newName });
        localStorage.setItem('gardenName', newName);
        this.querySelector('#garden-name')!.textContent = newName;
      }
    });

    const style = document.createElement('style');
    style.textContent = `
      .name-container {
        background: #fff;
        padding: 1rem 2rem;
        border-radius: 12px;
        display: inline-block;
        text-align: center;
        border: 4px solid #933a9f;
      }
      h1 {
        font-size: 2rem;
        color: #933a9f;
        margin: 0;
      }
      button {
        margin-top: 0.5rem;
        padding: 0.5rem 1rem;
        font-weight: bold;
        background-color: #933a9f;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
      }
    `;
    this.appendChild(style);
  }
}

customElements.define('editable-garden-name', EditableGardenName);

import { store } from '../store/GlobalState';
import './PlantForm';

class AdminPage extends HTMLElement {
  connectedCallback() {
    const { plants } = store.getState();
    this.innerHTML = `<h1>Editar Plantas</h1>`;
    const list = document.createElement('div');
    plants.forEach((plant) => {
      const form = document.createElement('plant-form');
      form.setAttribute('data-id', plant.id);
      list.appendChild(form);
    });
    this.appendChild(list);
  }
}
customElements.define('admin-page', AdminPage);

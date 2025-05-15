import { store } from '../store/GlobalState';
import './PlantCard';

class GardenPage extends HTMLElement {
  connectedCallback() {
    const { plants, garden } = store.getState();
    this.innerHTML = `
      <h1>Modificar Jardín</h1>
      <input placeholder="Nombre del Jardín" value="${store.getState().gardenName}" />
    `;
    const list = document.createElement('div');
    list.style.display = 'grid';
    plants.forEach((plant) => {
      const card = document.createElement('plant-card');
      card.setAttribute('data-id', plant.id);
      card.setAttribute('mode', 'garden');
      list.appendChild(card);
    });
    this.appendChild(list);
  }
}
customElements.define('garden-page', GardenPage);

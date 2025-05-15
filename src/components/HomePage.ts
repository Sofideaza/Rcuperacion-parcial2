import { store } from '../store/GlobalState';
import './PlantCard';

class HomePage extends HTMLElement {
  connectedCallback() {
    const { plants, garden } = store.getState();
    this.innerHTML = `<h1>${store.getState().gardenName}</h1>`;
    const list = document.createElement('div');
    list.style.display = 'grid';
    plants
      .filter((p) => garden.includes(p.id))
      .sort((a, b) => a.commonName.localeCompare(b.commonName))
      .forEach((plant) => {
        const card = document.createElement('plant-card');
        card.setAttribute('data-id', plant.id);
        list.appendChild(card);
      });
    this.appendChild(list);
  }
}
customElements.define('home-page', HomePage);
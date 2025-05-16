import { store } from '../store/GlobalState';

class PlantCard extends HTMLElement {
  connectedCallback() {
    const id = this.getAttribute('data-id') || '';
    const name = this.getAttribute('data-name') || '';
    const species = this.getAttribute('data-species') || '';
    const image = this.getAttribute('data-image') || '';

    this.innerHTML = `
      <div class="plant-card">
        <img src="${image}" alt="${name}" />
        <h3>${name}</h3>
        <p>${species}</p>
      </div>
    `;

    this.addEventListener('click', () => {
      const page = store.getState().page;
      if (page === 'admin') {
        const event = new CustomEvent('edit-plant', {
          bubbles: true,
          composed: true,
          detail: {
            id,
            name,
            species,
            image,
          },
        });
        this.dispatchEvent(event);
      }
    });
  }
}

if (!customElements.get('plant-card')) {
  customElements.define('plant-card', PlantCard);
}

export default PlantCard;

import { store } from '../store/GlobalState';

class PlantCard extends HTMLElement {
  connectedCallback() {
    const id = this.getAttribute('data-id') || '';
    const name = this.getAttribute('data-name') || '';
    const species = this.getAttribute('data-species') || '';
    const image = this.getAttribute('data-image') || '';
    const mode = this.getAttribute('data-mode') || ''; // "add" o "remove"
    const page = store.getState().page;

    const isGardenPage = page === 'garden' && (mode === 'add' || mode === 'remove');

    this.innerHTML = `
      <div class="plant-card">
        <img src="${image}" alt="${name}" />
        <h3>${name}</h3>
        <p>${species}</p>
        ${
          isGardenPage
            ? `<button class="${mode === 'add' ? 'add' : 'remove'}">
                ${mode === 'add' ? 'Agregar' : 'Eliminar'}
              </button>`
            : ''
        }
      </div>
    `;

    const style = document.createElement('style');
    style.textContent = `
      .plant-card {
        width: 220px;
        height: auto;
        background-color: white;
        border: 2px solid #933a9f;
        border-radius: 1rem;
        overflow: hidden;
        text-align: center;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        cursor: pointer;
        display: flex;
        flex-direction: column;
      }

      .plant-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
      }

      .plant-card img {
        width: 100%;
        height: 120px;
        object-fit: cover;
      }

      .plant-card h3 {
        margin: 0.5rem 0 0.25rem;
        color: #933a9f;
        font-size: 1rem;
        padding: 0 0.5rem;
      }

      .plant-card p {
        font-style: italic;
        color: #4a004a;
        font-size: 0.85rem;
        margin: 0;
        padding: 0 0.5rem 1rem;
      }

      .plant-card button {
        width: 100%;
        border: none;
        font-weight: bold;
        padding: 0.75rem 1rem;
        border-radius: 0 0 1rem 1rem;
        font-size: 0.9rem;
      }

      .plant-card button.add {
        background-color: #4CAF50;
        color: white;
      }

      .plant-card button.remove {
        background-color: #F45B69;
        color: white;
      }
    `;
    this.appendChild(style);

    this.querySelector('button')?.addEventListener('click', (e) => {
      e.stopPropagation(); // Evita que el clic afecte el evento de tarjeta entera
      const current = store.getState().garden;

      if (mode === 'add' && !current.includes(id)) {
        store.setState({ garden: [...current, id] });
      }

      if (mode === 'remove' && current.includes(id)) {
        store.setState({ garden: current.filter(g => g !== id) });
      }
    });

    this.addEventListener('click', () => {
      if (store.getState().page === 'admin') {
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

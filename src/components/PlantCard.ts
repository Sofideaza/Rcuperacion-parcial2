class PlantCard extends HTMLElement {
  static get observedAttributes() {
    return ['data-id', 'data-name', 'data-species', 'data-image', 'data-mode'];
  }

  attributeChangedCallback() {
    this.render();
  }

  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
    }
    this.render();
  }

  render() {
    if (!this.shadowRoot) return;

    const id = this.getAttribute('data-id') || '';
    const name = this.getAttribute('data-name') || '';
    const species = this.getAttribute('data-species') || '';
    const image = this.getAttribute('data-image') || '';
    const mode = this.getAttribute('data-mode');

    this.shadowRoot.innerHTML = `
      <div class="card" data-mode="${mode}">
        <img src="${image}" alt="${name}" />
        <div class="info">
          <h3>${name}</h3>
          <p>${species}</p>
        </div>
        <div class="action">
          ${mode ? `<button>${mode === 'add' ? 'Agregar' : 'Eliminar'}</button>` : ''}
        </div>
      </div>
    `;

    const style = document.createElement('style');
    style.textContent = `
      .card {
        width: 150px;
        height: 200px;
        background: #fff;
        border: 3px solid #933a9f;
        border-radius: 12px;
        overflow: hidden;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        transition: transform 0.3s ease;
        position: relative;
      }

      .card:hover {
        transform: scale(1.03);
      }

      .card img {
        width: 100%;
        height: 90px;
        object-fit: cover;
      }

      .info {
        padding: 0.2rem 0.4rem;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .card h3 {
        margin: 0.1rem 0 0.1rem;
        font-size: 1rem;
        color: #933a9f;
      }

      .card p {
        margin: 0;
        font-size: 0.75rem;
        color: #444;
      }

      .action {
        height: 32px;
      }

      .card button {
        display: none;
        width: 100%;
        border: none;
        padding: 0.4rem;
        font-weight: bold;
        color: white;
        cursor: pointer;
      }

      .card:hover button {
        display: block;
      }

      .card[data-mode="add"] button {
        background: #27c93f;
      }

      .card[data-mode="remove"] button {
        background: #ff6b6b;
      }
    `;
    this.shadowRoot.appendChild(style);
  }
}

customElements.define('plant-card', PlantCard);


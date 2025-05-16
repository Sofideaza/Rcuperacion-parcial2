import { store } from '../store/GlobalState';

class PlantForm extends HTMLElement {
  connectedCallback() {
    const id = this.getAttribute('data-id') || '';
    const name = this.getAttribute('data-name') || '';
    const species = this.getAttribute('data-species') || '';
    const image = this.getAttribute('data-image') || '';

    this.innerHTML = `
      <div class="plant-form-content">
        <img src="${image}" alt="${name}" />
        <div class="plant-form-fields">
          <label>Nombre común</label>
          <input type="text" value="${name}" id="commonName" />

          <label>Nombre científico</label>
          <input type="text" value="${species}" id="scientificName" />

          <label>URL de imagen</label>
          <input type="text" value="${image}" id="imageUrl" />

          <div class="plant-form-actions">
            <button class="cancel">Cancelar</button>
            <button class="save">Guardar</button>
          </div>
        </div>
      </div>
    `;

    const style = document.createElement('style');
    style.textContent = `
      plant-form {
        position: fixed;
        top: 0; left: 0;
        width: 100vw; height: 100vh;
        background-color: rgba(255, 255, 255, 0.95);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
      }

      .plant-form-content {
        display: flex;
        background-color: #fcecff;
        border-radius: 1.5rem;
        padding: 2rem;
        gap: 2rem;
        max-width: 900px;
        width: 90%;
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
      }

      .plant-form-content img {
        max-width: 300px;
        border-radius: 1rem;
      }

      .plant-form-fields {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }

      .plant-form-fields label {
        font-weight: bold;
        color: #7d157d;
        margin-bottom: 0.5rem;
      }

      .plant-form-fields input {
        padding: 0.8rem;
        border: 2px solid #7d157d;
        border-radius: 0.5rem;
        width: 100%;
      }

      .plant-form-actions {
        display: flex;
        justify-content: space-between;
        margin-top: 2rem;
        gap: 2rem;
      }

      .plant-form-actions button {
        flex: 1;
        padding: 1rem;
        border: none;
        border-radius: 1rem;
        font-weight: bold;
        font-size: 1.2rem;
        cursor: pointer;
      }

      button.cancel {
        background-color: transparent;
        border: 2px solid #7d157d;
        color: #7d157d;
      }

      button.save {
        background-color: #7d157d;
        color: white;
      }
    `;
    this.appendChild(style);

    this.querySelector('.cancel')?.addEventListener('click', () => this.remove());

    this.querySelector('.save')?.addEventListener('click', () => {
      const commonName = (this.querySelector('#commonName') as HTMLInputElement).value;
      const scientificName = (this.querySelector('#scientificName') as HTMLInputElement).value;
      const imageUrl = (this.querySelector('#imageUrl') as HTMLInputElement).value;

      const updatedPlants = store.getState().plants.map((p) =>
        p.id === id
          ? { ...p, commonName, scientificName, imageUrl }
          : p
      );

      store.setState({ plants: updatedPlants });
      this.remove();
    });
  }
}

if (!customElements.get('plant-form')) {
  customElements.define('plant-form', PlantForm);
}


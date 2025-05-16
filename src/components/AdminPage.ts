import { store } from '../store/GlobalState';
import '../components/PlantForm';

class AdminPage extends HTMLElement {
  connectedCallback() {
    this.render();
    this.addEventListener('edit-plant', (e: Event) => {
      const { id, name, species, image } = (e as CustomEvent).detail;
      const form = document.createElement('plant-form');
      form.setAttribute('data-id', id);
      form.setAttribute('data-name', name);
      form.setAttribute('data-species', species);
      form.setAttribute('data-image', image);
      document.body.appendChild(form);
    });
  }

  render() {
    const plants = store.getState().plants;

    this.innerHTML = `
      <h2 class="admin-title">Aquí puedes editar las plantas</h2>
      <div class="plants-grid">
        ${plants
          .map(
            (p) => `
              <plant-card
                data-id="${p.id}"
                data-name="${p.commonName}"
                data-species="${p.scientificName}"
                data-image="${p.imageUrl}"
              ></plant-card>`
          )
          .join('')}
      </div>
    `;
  }
}

if (!customElements.get('admin-page')) {
  customElements.define('admin-page', AdminPage);
}

export default AdminPage;

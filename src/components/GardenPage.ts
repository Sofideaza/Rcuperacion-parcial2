import { store } from '../store/GlobalState';
import { loadPlants } from '../data/plantLoader';
import '../components/NavBar';
import '../components/EditableGardenName';
import './PlantCard';
import './gardenPage.css';

class GardenPage extends HTMLElement {
  connectedCallback() {
    const { garden } = store.getState();
    const plants = loadPlants();

    const gardenPlants = plants
      .filter(p => garden.includes(p.id))
      .sort((a, b) => a.commonName.localeCompare(b.commonName));

    const otherPlants = plants
      .filter(p => !garden.includes(p.id))
      .sort((a, b) => a.commonName.localeCompare(b.commonName));

    this.innerHTML = `
      <nav-bar></nav-bar>

      <section class="hero" style="background-image: url('./banner.jpg');">
        <editable-garden-name></editable-garden-name>
      </section>

      <section>
        <h2>Tus plantas</h2>
        <div class="plants-grid">
          ${gardenPlants.map(p => `
            <plant-card
              data-id="${p.id}"
              data-name="${p.commonName}"
              data-species="${p.scientificName}"
              data-image="${p.imageUrl}"
              data-mode="remove"
            ></plant-card>
          `).join('')}
        </div>
      </section>

      <section class="bg-light">
        <h2>Agrégalas a tu jardín</h2>
        <div class="plants-grid">
          ${otherPlants.map(p => `
            <plant-card
              data-id="${p.id}"
              data-name="${p.commonName}"
              data-species="${p.scientificName}"
              data-image="${p.imageUrl}"
              data-mode="add"
            ></plant-card>
          `).join('')}
        </div>
      </section>
    `;

    this.querySelectorAll('plant-card')?.forEach((el) => {
      el.addEventListener('click', () => {
        const current = store.getState().garden;
        const id = el.getAttribute('data-id');
        const mode = el.getAttribute('data-mode');

        if (!id || !mode) return;

        if (mode === 'add' && !current.includes(id)) {
          store.setState({ garden: [...current, id] });
        }

        if (mode === 'remove' && current.includes(id)) {
          store.setState({ garden: current.filter(g => g !== id) });
        }
      });
    });
  }
}

customElements.define('garden-page', GardenPage);
export default GardenPage;
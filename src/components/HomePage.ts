import { store } from '../store/GlobalState';
import './home.css';
import './NavBar';

class HomePage extends HTMLElement {
  connectedCallback() {
    store.subscribe(() => this.render());
    this.render();
  }

  render() {
    const { plants, garden, page } = store.getState();

    const gardenPlants = plants
      .filter(p => garden.includes(p.id))
      .sort((a, b) => a.commonName.localeCompare(b.commonName));

    this.innerHTML = `
      <nav-bar active="${page}"></nav-bar>

      <section class="hero">
        <h1>BIENVENIDO A TU JARDÍN</h1>
        <div class="scroll-down">⬇</div>
      </section>

      <section id="garden-section">
        <h2>¡Aquí están las plantas de tu jardín!</h2>
        <div class="plants-grid">
          ${gardenPlants.map(p => `
            <plant-card
              data-id="${p.id}"
              data-name="${p.commonName}"
              data-species="${p.scientificName}"
              data-image="${p.imageUrl}"
            ></plant-card>
          `).join('')}
        </div>
        <br />
        <button data-page="garden">Modificar jardín</button>
      </section>
    `;

    this.querySelector('.scroll-down')?.addEventListener('click', () => {
      document.getElementById('garden-section')?.scrollIntoView({ behavior: 'smooth' });
    });

    this.querySelectorAll('[data-page]')?.forEach((el) => {
      el.addEventListener('click', () => {
        const target = (el as HTMLElement).dataset.page;
        if (target) store.setState({ page: target as any });
      });
    });
  }
}

customElements.define('home-page', HomePage);


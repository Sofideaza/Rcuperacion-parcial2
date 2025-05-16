import { store } from '../store/GlobalState';
import './adminPage.css';

class AdminPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <nav-bar></nav-bar>
      <h2>Aquí puedes editar las plantas</h2>
      <section class="plants-grid">
        ${store
          .getState()
          .plants.map(
            (p) => `
            <plant-card
              data-id="${p.id}"
              data-name="${p.commonName}"
              data-species="${p.scientificName}"
              data-image="${p.imageUrl}"
              data-mode="edit"
            ></plant-card>`
          )
          .join('')}
      </section>
      <plant-form style="display: none;"></plant-form>
    `;

    this.querySelectorAll('plant-card')?.forEach((card) => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        const name = card.getAttribute('data-name');
        const species = card.getAttribute('data-species');
        const image = card.getAttribute('data-image');
        const form = this.querySelector('plant-form') as HTMLElement;

        if (form && id && name && species && image) {
          form.setAttribute('data-id', id);
          form.setAttribute('data-name', name);
          form.setAttribute('data-species', species);
          form.setAttribute('data-image', image);
          (form.style as CSSStyleDeclaration).display = 'flex';
        }
      });
    });

    store.subscribe(() => {
      if (store.getState().page === 'admin') {
        this.connectedCallback();
      }
    });
  }
}

customElements.define('admin-page', AdminPage);
export default AdminPage;
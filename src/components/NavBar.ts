import { store } from '../store/GlobalState';

class NavBar extends HTMLElement {
  connectedCallback() {
    const page = store.getState().page;

    const homeIconActive = './homeAct.png';
    const homeIconInactive = './homeDesc.png';
    this.innerHTML = `
      <nav class="navbar">
        <button class="nav-btn" data-page="garden">Modificar jardín</button>
        <img
          src="${page === 'home' ? homeIconActive : homeIconInactive}"
          alt="Inicio"
          class="nav-home"
          data-page="home"
        />
        <button class="nav-btn" data-page="admin">Modo Admin</button>
      </nav>
    `;

    this.querySelectorAll('[data-page]')?.forEach((el) => {
      el.addEventListener('click', () => {
        const target = (el as HTMLElement).dataset.page;
        if (target) store.setState({ page: target as any });
      });
    });
  }
}

customElements.define('nav-bar', NavBar);

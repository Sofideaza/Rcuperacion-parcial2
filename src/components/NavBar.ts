import { store } from '../store/GlobalState';

class NavBar extends HTMLElement {
  connectedCallback() {
    const currentPage = store.getState().page;

    this.innerHTML = `
      <nav class="navbar">
        <button data-page="garden" class="${currentPage === 'garden' ? 'active' : ''}">
          Modificar jardín
        </button>

        <img src="homeAct.png" alt="Inicio" id="home-icon" class="nav-icon" data-page="home" />

        <button data-page="admin" class="${currentPage === 'admin' ? 'active' : ''}">
          Modo Admin
        </button>
      </nav>
    `;

    this.querySelectorAll('[data-page]')?.forEach((el) => {
      el.addEventListener('click', () => {
        const page = (el as HTMLElement).dataset.page as 'home' | 'garden' | 'admin';
        store.setState({ page });
      });
    });

    const style = document.createElement('style');
    style.textContent = `
      .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 2rem;
        border-bottom: 3px solid #933a9f;
        background-color: white;
      }

      button {
        border: 2px solid #933a9f;
        background-color: white;
        padding: 0.5rem 1rem;
        color: #933a9f;
        font-weight: bold;
        border-radius: 8px;
        cursor: pointer;
        transition: background-color 0.2s ease;
      }

      button:hover {
        background-color: #f3e6f7;
      }

      .nav-icon {
        height: 28px;
        cursor: pointer;
        transition: transform 0.2s ease;
      }

      .nav-icon:hover {
        transform: scale(1.1);
      }

      .active {
        background-color: #f3e6f7;
      }
    `;
    this.appendChild(style);
  }
}

customElements.define('nav-bar', NavBar);

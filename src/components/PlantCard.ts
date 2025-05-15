import { store } from '../store/GlobalState';

class PlantCard extends HTMLElement {
  connectedCallback() {
    const id = this.getAttribute('data-id')!;
    const mode = this.getAttribute('mode');
    const plant = store.getState().plants.find((p) => p.id === id);
    const isInGarden = store.getState().garden.includes(id);
    this.innerHTML = `
      <div style="opacity:${mode === 'garden' && !isInGarden ? 0.5 : 1}; border:1px solid #ccc; padding:10px;">
        <img src="${plant!.imageUrl}" width="100" />
        <h3>${plant!.commonName}</h3>
        <p><i>${plant!.scientificName}</i></p>
        ${mode === 'garden' ? `<button>${isInGarden ? 'Quitar' : 'Agregar'}</button>` : ''}
      </div>
    `;
    if (mode === 'garden') {
      this.querySelector('button')?.addEventListener('click', () => {
        const garden = [...store.getState().garden];
        if (isInGarden) {
          store.setState({ garden: garden.filter((gid) => gid !== id) });
        } else {
          store.setState({ garden: [...garden, id] });
        }
      });
    }
  }
}
customElements.define('plant-card', PlantCard);
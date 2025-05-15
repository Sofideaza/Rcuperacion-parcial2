import { store } from '../store/GlobalState';

class PlantForm extends HTMLElement {
  connectedCallback() {
    const id = this.getAttribute('data-id')!;
    const plant = store.getState().plants.find((p) => p.id === id)!;
    this.innerHTML = `
      <form>
        <input name="commonName" value="${plant.commonName}" />
        <input name="scientificName" value="${plant.scientificName}" />
        <input name="imageUrl" value="${plant.imageUrl}" />
        <button>Guardar</button>
      </form>
    `;
    this.querySelector('form')!.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = new FormData(e.target as HTMLFormElement);
      const updated = {
        ...plant,
        commonName: data.get('commonName')!.toString(),
        scientificName: data.get('scientificName')!.toString(),
        imageUrl: data.get('imageUrl')!.toString(),
      };
      const newPlants = store.getState().plants.map((p) => (p.id === id ? updated : p));
      store.setState({ plants: newPlants });
    });
  }
}
customElements.define('plant-form', PlantForm);

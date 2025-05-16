import { store } from '../store/GlobalState';

class PlantForm extends HTMLElement {
  connectedCallback() {
    const id = this.getAttribute('data-id') || '';
    const commonName = this.getAttribute('data-name') || '';
    const scientificName = this.getAttribute('data-species') || '';
    const imageUrl = this.getAttribute('data-image') || '';

    this.innerHTML = `
      <div class="plant-form">
        <img src="${imageUrl}" alt="Preview" class="preview-img" />
        <form>
          <label>Nombre común de la planta</label>
          <input type="text" name="common" value="${commonName}" />

          <label>Nombre científico de la planta</label>
          <input type="text" name="scientific" value="${scientificName}" />

          <label>URL de la imagen</label>
          <input type="text" name="image" value="${imageUrl}" />

          <div class="form-buttons">
            <button type="button" id="cancel">Cancelar</button>
            <button type="submit">Guardar</button>
          </div>
        </form>
      </div>
    `;

    const imgPreview = this.querySelector('.preview-img') as HTMLImageElement;
    const inputImage = this.querySelector('input[name="image"]') as HTMLInputElement;

    inputImage?.addEventListener('input', () => {
      imgPreview.src = inputImage.value;
    });

    this.querySelector('#cancel')?.addEventListener('click', () => {
      this.style.display = 'none';
    });

    this.querySelector('form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const state = store.getState();
      const newCommon = (this.querySelector('input[name="common"]') as HTMLInputElement).value;
      const newScientific = (this.querySelector('input[name="scientific"]') as HTMLInputElement).value;
      const newImage = (this.querySelector('input[name="image"]') as HTMLInputElement).value;

      const updatedPlants = state.plants.map((plant) =>
        plant.id === id ? { ...plant, commonName: newCommon, scientificName: newScientific, imageUrl: newImage } : plant
      );

      store.setState({ plants: updatedPlants });
      this.style.display = 'none';
    });
  }
}

customElements.define('plant-form', PlantForm);
export default PlantForm;


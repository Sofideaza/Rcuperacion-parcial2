import './components/HomePage';
import './components/GardenPage';
import './components/AdminPage';
import './components/NavBar';
import './components/PlantForm';
import { store } from './store/GlobalState';
import { loadPlants } from './data/plantLoader';

const root = document.getElementById('root');
const navbar = document.createElement('nav-bar');

store.subscribe(() => {
  const { page } = store.getState();

  if (root) {
    root.innerHTML = '';
    root.appendChild(navbar);

    switch (page) {
      case 'home':
        root.appendChild(document.createElement('home-page'));
        break;
      case 'garden':
        root.appendChild(document.createElement('garden-page'));
        break;
      case 'admin':
        root.appendChild(document.createElement('admin-page'));
        break;
    }
  }

  console.log(`Renderizando página: ${page}`);
});

const plants = loadPlants();
store.setState({ plants });
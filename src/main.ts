import './components/HomePage';
import './components/GardenPage';
import './components/AdminPage';
import { store } from './store/GlobalState';
import { loadPlants } from './data/plantLoader';

const root = document.getElementById('root');

store.subscribe(() => {
  const { page } = store.getState();

  if (root) {
    switch (page) {
      case 'home':
        root.innerHTML = '<home-page></home-page>';
        break;
      case 'garden':
        root.innerHTML = '<garden-page></garden-page>';
        break;
      case 'admin':
        root.innerHTML = '<admin-page></admin-page>';
        break;
    }
  }

  console.log(`Renderizando página: ${page}`);
});

const plants = loadPlants();
store.setState({ plants });

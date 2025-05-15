import { store } from './store/GlobalState';
import { loadPlants } from './data/plantLoader';
import './components/HomePage';
import './components/AdminPage';
import './components/GardenPage';

async function init() {
  const plants = await loadPlants();
  store.setState({ plants });

  const root = document.getElementById('root')!;

  function render() {
    root.innerHTML = '';
    const page = store.getState().page;
    const el = document.createElement(`${page}-page`);
    root.appendChild(el);
  }

  store.subscribe(render);
  render();

  document.getElementById('nav')!.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'BUTTON') {
      store.setState({ page: target.dataset.page as any });
    }
  });
}

init();
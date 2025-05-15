export interface Plant {
  id: string;
  commonName: string;
  scientificName: string;
  imageUrl: string;
  type: string;
  origin: string;
  floweringSeason: string;
  sunExposure: string;
  watering: string;
}

export interface AppState {
  plants: Plant[];
  garden: string[];
  gardenName: string;
  page: 'home' | 'admin' | 'garden';
}

class GlobalState {
  private state: AppState = {
    plants: [],
    garden: [],
    gardenName: 'Mi Jardín Virtual',
    page: 'home',
  };

  private listeners: Function[] = [];

  subscribe(listener: Function) {
    this.listeners.push(listener);
  }

  setState(newState: Partial<AppState>) {
    this.state = { ...this.state, ...newState };
    this.listeners.forEach((fn) => fn());
  }

  getState(): AppState {
    return this.state;
  }
}

export const store = new GlobalState();

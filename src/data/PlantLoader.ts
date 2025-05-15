import plants from './assets/plants.json';
import { Plant } from '../store/GlobalState';

export async function loadPlants(): Promise<Plant[]> {
  return plants.map((item, index) => ({
    id: index.toString(),
    commonName: item.common_name,
    scientificName: item.scientific_name,
    imageUrl: item.img,
    type: item.type,
    origin: item.origin,
    floweringSeason: item.flowering_season,
    sunExposure: item.sun_exposure,
    watering: item.watering
  }));
}

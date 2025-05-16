import plantsData from './assets/plants.json';

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

export const loadPlants = (): Plant[] => {
  return plantsData.map((p, index) => ({
    id: String(index),
    commonName: p.common_name,
    scientificName: p.scientific_name,
    imageUrl: p.img,
    type: p.type,
    origin: p.origin,
    floweringSeason: p.flowering_season,
    sunExposure: p.sun_exposure,
    watering: p.watering,
  }));
};


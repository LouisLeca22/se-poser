import { IconType } from 'react-icons';
export type Amenity = {
    name: string;
    icon: IconType;
    selected: boolean;
};
import {
    FiCloud,
    FiTruck,
    FiZap,
    FiWind,
    FiSun,
    FiCoffee,
    FiFeather,
    FiAirplay,
    FiTrello,
    FiBox,
    FiAnchor,
    FiDroplet,
    FiMapPin,
    FiSunrise,
    FiSunset,
    FiMusic,
    FiHeadphones,
    FiRadio,
    FiFilm,
    FiTv,
} from 'react-icons/fi';


export const amenities: Amenity[] = [
    { name: 'stockage en ligne', icon: FiCloud, selected: false },
    { name: 'parking', icon: FiTruck, selected: false },
    { name: 'brasero', icon: FiZap, selected: false },
    { name: 'barbecue', icon: FiWind, selected: false },
    { name: 'mobilier d’extérieur', icon: FiSun, selected: false },
    { name: 'salle de bain privée', icon: FiCoffee, selected: false },
    { name: 'douche chaude', icon: FiFeather, selected: false },
    { name: 'kitchenette', icon: FiAirplay, selected: false },
    { name: 'chauffage', icon: FiTrello, selected: false },
    { name: 'climatisation', icon: FiBox, selected: false },
    { name: 'draps de lit', icon: FiAnchor, selected: false },
    { name: 'serviettes', icon: FiDroplet, selected: false },
    { name: 'table de pique-nique', icon: FiMapPin, selected: false },
    { name: 'hamac', icon: FiSunrise, selected: false },
    { name: 'énergie solaire', icon: FiSunset, selected: false },
    { name: 'approvisionnement en eau', icon: FiMusic, selected: false },
    { name: 'ustensiles de cuisine', icon: FiHeadphones, selected: false },
    { name: 'glacière', icon: FiRadio, selected: false },
    { name: 'lanternes', icon: FiFilm, selected: false },
    { name: 'trousse de premiers secours', icon: FiTv, selected: false },
];
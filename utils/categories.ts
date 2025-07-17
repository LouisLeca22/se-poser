import { IconType } from 'react-icons';
import { MdCabin, MdChalet } from 'react-icons/md'

import { TbCaravan, TbTent, TbBuildingCottage } from 'react-icons/tb';

import { GiWoodCabin, GiMushroomHouse, GiStonePath, GiHabitatDome } from 'react-icons/gi';
import { PiLighthouse } from 'react-icons/pi';



type Category = {
    name: CategoryName;
    label: string
    icon: IconType;
};

export type CategoryName =
    | 'cabin'
    | 'tent'
    | 'chalet'
    | 'cottage'
    | 'troglodyte'
    | 'caravan'
    | 'tiny'
    | 'magic'
    | 'dome'
    | 'lodge';


export const categories: Category[] = [
    {
        name: "cabin",
        label: 'Cabane',
        icon: MdCabin,
    },
    {
        name: 'tent',
        label: "Tente",
        icon: TbTent,
    },
    {
        name: "chalet",
        label: "Chalet",
        icon: MdChalet
    },
    {
        name: "cottage",
        label: 'Cottage',
        icon: TbBuildingCottage,
    },
    {
        name: "troglodyte",
        label: "Troglodyte",
        icon: GiStonePath
    },
    {
        name: 'caravan',
        label: "Caravane",
        icon: TbCaravan,
    },
    {
        name: "tiny",
        label: 'Tiny',
        icon: PiLighthouse,
    },
    {
        name: 'magic',
        label: "féerique",
        icon: GiMushroomHouse,
    },
    {
        name: "dome",
        label: "Dome",
        icon: GiHabitatDome
    },
    {
        name: "lodge",
        label: 'Lodge',
        icon: GiWoodCabin,
    }
];

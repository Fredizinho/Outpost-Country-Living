import React from 'react';
import {
  Droplets,
  CloudRain,
  Sprout,
  Compass,
  Sun,
  Utensils,
  TrendingUp,
  DollarSign
} from 'lucide-react';

export type CalculatorId =
  | 'solar-pump'
  | 'rainwater'
  | 'land-zoning'
  | 'planting-pit'
  | 'solar-power'
  | 'food-reserve'
  | 'crop-yield'
  | 'budget';

export interface CalculatorGroup {
  groupName: string;
  items: {
    id: CalculatorId;
    title: string;
    description: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
  }[];
}

export const CALCULATOR_GROUPS: CalculatorGroup[] = [
  {
    groupName: 'Water',
    items: [
      {
        id: 'solar-pump',
        title: 'Solar pump & well',
        description: 'Borehole depth, solar array watts, tank size',
        icon: Droplets
      },
      {
        id: 'rainwater',
        title: 'Rainwater & cisterns',
        description: 'Roof catchment volume & dry dimba garden',
        icon: CloudRain
      }
    ]
  },
  {
    groupName: 'Soil',
    items: [
      {
        id: 'land-zoning',
        title: 'Homestead land zoning',
        description: 'Permaculture layout across 5 functional zones',
        icon: Compass
      },
      {
        id: 'planting-pit',
        title: 'Planting pits & biochar',
        description: 'Tree moisture sponge & amendment volume',
        icon: Sprout
      }
    ]
  },
  {
    groupName: 'Energy',
    items: [
      {
        id: 'solar-power',
        title: 'Off-grid solar & battery',
        description: '48V LiFePO4 storage & household inverter',
        icon: Sun
      }
    ]
  },
  {
    groupName: 'Planting',
    items: [
      {
        id: 'food-reserve',
        title: 'Grain & food reserve',
        description: '12-month staple grains and seed storage',
        icon: Utensils
      },
      {
        id: 'crop-yield',
        title: 'Crop yield & Sasakawa',
        description: 'Mulched pit gains vs conventional ridges',
        icon: TrendingUp
      }
    ]
  },
  {
    groupName: 'Money',
    items: [
      {
        id: 'budget',
        title: 'Setup capital & BoQ',
        description: 'Land title, drilling, building & tooling costs',
        icon: DollarSign
      }
    ]
  }
];

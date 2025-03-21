
import { catedralRoutes6001 } from './catedralRoutes6001';
import { catedralRoutes6001E } from './catedralRoutes6001E';
import { catedralRoutes6002 } from './catedralRoutes6002';
import { catedralRoutes6003 } from './catedralRoutes6003';
import { catedralRoutes6802 } from './catedralRoutes6802';
import { catedralRoutes6705 } from './catedralRoutes6705';
import { BusRoute } from '../../types/busTypes';

// Combine all Catedral routes
export const catedralRoutes: BusRoute[] = [
  ...catedralRoutes6001,
  ...catedralRoutes6001E,
  ...catedralRoutes6003
];

export const catedralRoutes2: BusRoute[] = [
  ...catedralRoutes6002,
  ...catedralRoutes6802,
  ...catedralRoutes6705
];

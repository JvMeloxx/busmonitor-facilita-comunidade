
import { luzianiaLocalRoutes } from './luzianiaLocalRoutes';
import { ctExpressoRoutesDf } from './ctExpressoRoutesDf';
import { ctExpressoRoutes, ctExpressoRoutes2, ctExpressoRoutes3 } from './ctExpresso/index';
import { catedralRoutes, catedralRoutes2 } from './catedral/index';
import { recentUpdates } from './busUpdates';
import { updateNextScheduledTimes } from '../utils/scheduleUtils';

// Combine all routes
const allRoutes = [
  ...luzianiaLocalRoutes,
  ...ctExpressoRoutesDf,
  ...ctExpressoRoutes,
  ...ctExpressoRoutes2,
  ...ctExpressoRoutes3,
  ...catedralRoutes,
  ...catedralRoutes2
];

// Update the next scheduled times when the module is loaded
updateNextScheduledTimes(allRoutes);

// Export everything needed by the rest of the application
export { allRoutes as busRoutes, recentUpdates };
export * from '../types/busTypes';

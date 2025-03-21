
import { busRoutes } from './busRoutes';
import { recentUpdates } from './busUpdates';
import { updateNextScheduledTimes } from '../utils/scheduleUtils';

// Update the next scheduled times when the module is loaded
updateNextScheduledTimes(busRoutes);

// Export everything needed by the rest of the application
export { busRoutes, recentUpdates };
export * from '../types/busTypes';

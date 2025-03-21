
import { BusRoute } from "../types/busTypes";

// Calculate next scheduled time based on current time
export const updateNextScheduledTimes = (routes: BusRoute[]) => {
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes(); // Current time in minutes
  const dayOfWeek = now.getDay(); // 0 is Sunday, 1-5 is Monday-Friday, 6 is Saturday
  
  routes.forEach(route => {
    let scheduleToUse;
    
    if (dayOfWeek === 0) {
      scheduleToUse = route.schedule.sunday;
    } else if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      scheduleToUse = route.schedule.mondayToFriday;
    } else {
      scheduleToUse = route.schedule.saturdayAndHoliday;
    }
    
    // Combine all times from different periods and sort them
    const allTimes = [
      ...scheduleToUse.morning,
      ...scheduleToUse.afternoon,
      ...scheduleToUse.evening
    ].map(timeStr => {
      const [hours, minutes] = timeStr.split(':').map(Number);
      return hours * 60 + minutes; // Convert to minutes for easier comparison
    }).sort((a, b) => a - b);
    
    // Find the next time that's after current time
    const nextTime = allTimes.find(time => time > currentTime);
    
    if (nextTime) {
      // Convert back to HH:MM format
      const nextHours = Math.floor(nextTime / 60);
      const nextMinutes = nextTime % 60;
      route.nextScheduledTime = `${nextHours.toString().padStart(2, '0')}:${nextMinutes.toString().padStart(2, '0')}`;
    } else if (allTimes.length > 0) {
      // If no next time today, use the first time (tomorrow)
      const tomorrowFirstTime = allTimes[0];
      const nextHours = Math.floor(tomorrowFirstTime / 60);
      const nextMinutes = tomorrowFirstTime % 60;
      route.nextScheduledTime = `${nextHours.toString().padStart(2, '0')}:${nextMinutes.toString().padStart(2, '0')} (amanhã)`;
    } else {
      route.nextScheduledTime = "Não disponível";
    }
  });
};

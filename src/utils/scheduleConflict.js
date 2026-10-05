/**
 * Schedule Conflict Detection Utility
 * Detects time overlaps between courses based on days and time ranges.
 */

/**
 * Converts "HH:MM" 24-hour time to minutes from midnight
 */
export function timeToMinutes(timeStr) {
  if (!timeStr) return 0;
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
}

/**
 * Checks if two time intervals on the same day overlap
 * Condition: startA < endB AND endA > startB
 */
export function intervalsOverlap(startA, endA, startB, endB) {
  const sA = timeToMinutes(startA);
  const eA = timeToMinutes(endA);
  const sB = timeToMinutes(startB);
  const eB = timeToMinutes(endB);
  return sA < eB && eA > sB;
}

/**
 * Check if two courses have any overlapping schedule
 */
export function doCoursesConflict(courseA, courseB) {
  if (!courseA || !courseB || courseA.id === courseB.id) return false;

  const scheduleA = courseA.schedule;
  const scheduleB = courseB.schedule;
  if (!scheduleA || !scheduleB) return false;

  // Check if they share any common day
  const commonDays = scheduleA.days.filter(day => scheduleB.days.includes(day));
  if (commonDays.length === 0) return false;

  // Check time overlap
  const isOverlapping = intervalsOverlap(
    scheduleA.startTime,
    scheduleA.endTime,
    scheduleB.startTime,
    scheduleB.endTime
  );

  return isOverlapping ? {
    commonDays,
    timeA: `${scheduleA.startTime} - ${scheduleA.endTime}`,
    timeB: `${scheduleB.startTime} - ${scheduleB.endTime}`
  } : false;
}

/**
 * Checks if a target course conflicts with any course in a list of enrolled courses
 * @param {Object} targetCourse - The course being checked
 * @param {Array} enrolledCourses - List of already enrolled courses
 * @returns {Object|null} - Details of the conflicting course or null
 */
export function findScheduleConflict(targetCourse, enrolledCourses) {
  if (!targetCourse || !enrolledCourses || enrolledCourses.length === 0) return null;

  for (const enrolled of enrolledCourses) {
    if (enrolled.id === targetCourse.id) continue;
    const conflict = doCoursesConflict(targetCourse, enrolled);
    if (conflict) {
      return {
        conflictingCourse: enrolled,
        commonDays: conflict.commonDays,
        timeA: conflict.timeA,
        timeB: conflict.timeB,
        message: `Clashes with ${enrolled.code} (${enrolled.title}) on ${conflict.commonDays.join(", ")} from ${conflict.timeB}`
      };
    }
  }

  return null;
}

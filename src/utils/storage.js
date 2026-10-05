/**
 * Local Storage Persistence Helpers
 * Handles caching and loading state for enrolled courses, cart, and profile.
 */

export const STORAGE_KEYS = {
  ENROLLED_COURSES: "ccrs_enrolled_courses_v1",
  CART_COURSES: "ccrs_cart_courses_v1",
  WAITLIST_COURSES: "ccrs_waitlist_courses_v1",
  STUDENT_PROFILE: "ccrs_student_profile_v1"
};

export const loadFromStorage = (key, defaultValue) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn(`Error reading localStorage key "${key}":`, error);
    return defaultValue;
  }
};

export const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Error writing to localStorage key "${key}":`, error);
  }
};

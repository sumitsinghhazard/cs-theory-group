// loadComponents.js
import { renderAbout } from './about.js';
import { renderFaculty } from './faculty.js';
import { renderStudents } from './students.js';
import { renderSeminars } from './events.js';
import { renderCourses } from './courses.js';

export async function loadComponents() {
  renderAbout(); // Render the About section
  await renderFaculty(); // Load faculty by default
  await renderSeminars(); // Load seminars
  await renderCourses(); // Load courses
}

// Fetch data function shared among components
export async function fetchData(file) {
  try {
    const response = await fetch(file);
    if (!response.ok) throw new Error(`Failed to load ${file}`);
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

// renderContent.js
import { loadComponents } from './loadComponents.js';

window.onload = async function () {
  await loadComponents(); // Load all components when the page loads

  // Event listeners for tabs
  document.getElementById("faculty-tab").addEventListener("click", () => {
    renderFaculty();
  });
  document.getElementById("students-tab").addEventListener("click", () => {
    renderStudents();
  });
};

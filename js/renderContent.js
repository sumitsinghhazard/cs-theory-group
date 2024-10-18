// renderContent.js
import { loadComponents } from './loadComponents.js';
import { renderFaculty } from './faculty.js';
import { renderStudents } from './students.js';

document.addEventListener('DOMContentLoaded', async function () {
  try {
    await loadComponents(); // Load initial components

    // Get references to the tabs
    const facultyTab = document.getElementById("faculty-tab");
    const studentsTab = document.getElementById("students-tab");

    if (facultyTab && studentsTab) {
      // Add event listeners for tab switching
      facultyTab.addEventListener("click", () => {
        renderFaculty(); // Show faculty content
        switchToTab("faculty-content", "students-content");
      });

      studentsTab.addEventListener("click", () => {
        renderStudents(); // Show student content
        switchToTab("students-content", "faculty-content");
      });

      // Show faculty content by default
      renderFaculty();
      switchToTab("faculty-content", "students-content");
    } else {
      console.error("Tabs not found. Check element IDs in HTML.");
    }
  } catch (error) {
    console.error("Error during initialization:", error);
  }
});

// Helper function to handle tab switching logic
function switchToTab(showId, hideId) {
  document.getElementById(showId).style.display = 'block';
  document.getElementById(hideId).style.display = 'none';
}

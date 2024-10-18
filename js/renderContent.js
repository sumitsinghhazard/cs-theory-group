// renderContent.js
document.addEventListener('DOMContentLoaded', async function () {
  await loadComponents(); // Load components when DOM is ready

  // Ensure these elements exist before adding listeners
  const facultyTab = document.getElementById("faculty-tab");
  const studentsTab = document.getElementById("students-tab");

  if (facultyTab && studentsTab) {
    facultyTab.addEventListener("click", renderFaculty);
    studentsTab.addEventListener("click", renderStudents);
  } else {
    console.error("Tabs not found. Check element IDs in HTML.");
  }
});


// js/loadComponents.js

// Function to load an HTML file into a specific element by ID
function loadComponent(id, file) {
  fetch(file)
    .then(response => {
      if (!response.ok) throw new Error(`Failed to load ${file}`);
      return response.text();
    })
    .then(html => {
      document.getElementById(id).innerHTML = html;
    })
    .catch(error => console.error(error));
}

// Load components on page load
window.onload = function () {
  loadComponent("header", "header.html");
  loadComponent("content", "faculty.html"); // Faculty loaded by default

  // Load modular sidebar components
  loadComponent("calendar", "sidebar/calendar.html");
  loadComponent("seminars", "sidebar/seminars.html");
  loadComponent("courses", "sidebar/courses.html");
  loadComponent("links", "sidebar/links.html");

  // Add event listeners to tabs for dynamic content switching
  document.getElementById("faculty-tab").classList.add("active");

  document.getElementById("faculty-tab").addEventListener("click", () => {
    loadComponent("content", "faculty.html");
    setActiveTab("faculty-tab");
  });

  document.getElementById("students-tab").addEventListener("click", () => {
    loadComponent("content", "students.html");
    setActiveTab("students-tab");
  });
};

// Helper function to manage active tab state
function setActiveTab(activeTabId) {
  document.querySelectorAll(".nav-link").forEach((tab) => {
    tab.classList.remove("active");
  });
  document.getElementById(activeTabId).classList.add("active");
}

// js/loadComponents.js

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

window.onload = function () {
  // Load header and about section
  loadComponent("header", "header.html");
  loadComponent("about", "about.html"); // About section loaded by default

  // Load default faculty content
  loadComponent("content", "faculty.html");

  // Load sidebar components
  loadComponent("calendar", "sidebar/calendar.html");
  loadComponent("seminars", "sidebar/seminars.html");
  loadComponent("courses", "sidebar/courses.html");
  loadComponent("links", "sidebar/links.html");

  // Add event listeners for tab switching
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

function setActiveTab(activeTabId) {
  document.querySelectorAll(".nav-link").forEach((tab) => {
    tab.classList.remove("active");
  });
  document.getElementById(activeTabId).classList.add("active");
}

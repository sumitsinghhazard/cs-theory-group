// Fetch data from a JSON file
async function fetchData(file) {
  try {
    const response = await fetch(file);
    if (!response.ok) throw new Error(`Failed to load ${file}`);
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Render faculty and students
async function renderPeople(type) {
  const data = await fetchData(`data/${type}.json`);
  const container = document.getElementById("content");
  container.innerHTML = ""; // Clear previous content

  data.forEach(person => {
    const card = document.createElement("div");
    card.className = "list-group-item d-flex align-items-center";

    card.innerHTML = `
      <img src="${person.photo}" alt="${person.name}" class="img-profile me-3" style="width: 75px; height: 75px;">
      <div>
        <a href="${person.website}" target="_blank"><strong>${person.name}</strong></a><br>
        <span>Research: ${person.research}</span>
      </div>
    `;
    container.appendChild(card);
  });
}

// Render seminars
async function renderSeminars() {
  const events = await fetchData("data/events.json");
  const container = document.getElementById("seminars");
  container.innerHTML = "<h5>Upcoming Seminars</h5>"; // Header

  if (events.length === 0) {
    container.innerHTML += '<p>No upcoming seminars scheduled.</p>';
    return;
  }

  events.forEach(event => {
    const card = document.createElement("div");
    card.className = "card mb-2";
    card.innerHTML = `
      <div class="card-body">
        <h6 class="card-title">${event.title}</h6>
        <p class="card-text">${event.date}</p>
        <p class="card-text">${event.description}</p>
      </div>
    `;
    container.appendChild(card);
  });
}

// Render courses
async function renderCourses() {
  const courses = await fetchData("data/courses.json");
  const container = document.getElementById("courses");
  container.innerHTML = "<h5>Available Courses</h5>"; // Header

  if (courses.length === 0) {
    container.innerHTML += '<p>No courses available at the moment.</p>';
    return;
  }

  courses.forEach(course => {
    const card = document.createElement("div");
    card.className = "card mb-2";
    card.innerHTML = `
      <div class="card-body">
        <h6 class="card-title">${course.name}</h6>
        <p class="card-text">${course.description}</p>
      </div>
    `;
    container.appendChild(card);
  });
}

// Initialize the default view
window.onload = function () {
  renderPeople("faculty"); // Show faculty by default
  renderSeminars(); // Load seminars
  renderCourses(); // Load courses

  document.getElementById("faculty-tab").addEventListener("click", () => {
    renderPeople("faculty");
  });
  document.getElementById("students-tab").addEventListener("click", () => {
    renderPeople("students");
  });
};

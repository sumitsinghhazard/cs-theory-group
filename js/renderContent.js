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
  const container = document.getElementById("seminarsAccordion");
  container.innerHTML = ""; // Clear previous content

  if (events.length === 0) {
    container.innerHTML = '<div class="accordion-item"><h2 class="accordion-header"><button class="accordion-button" disabled>No upcoming seminars scheduled.</button></h2></div>';
    return;
  }

  events.forEach((event, index) => {
    const card = document.createElement("div");
    card.className = "accordion-item";
    card.innerHTML = `
      <h2 class="accordion-header" id="heading${index}">
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
          ${event.title}
        </button>
      </h2>
      <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}" data-bs-parent="#seminarsAccordion">
        <div class="accordion-body">
          <strong>Date:</strong> ${event.date}<br>
          <strong>Description:</strong> ${event.description}
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// Render courses
async function renderCourses() {
  const courses = await fetchData("data/courses.json");
  const container = document.getElementById("coursesAccordion");
  container.innerHTML = ""; // Clear previous content

  if (courses.length === 0) {
    container.innerHTML = '<div class="accordion-item"><h2 class="accordion-header"><button class="accordion-button" disabled>No courses available at the moment.</button></h2></div>';
    return;
  }

  courses.forEach((course, index) => {
    const card = document.createElement("div");
    card.className = "accordion-item";
    card.innerHTML = `
      <h2 class="accordion-header" id="courseHeading${index}">
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#courseCollapse${index}" aria-expanded="true" aria-controls="courseCollapse${index}">
          ${course.name}
        </button>
      </h2>
      <div id="courseCollapse${index}" class="accordion-collapse collapse" aria-labelledby="courseHeading${index}" data-bs-parent="#coursesAccordion">
        <div class="accordion-body">
          <strong>Description:</strong> ${course.description}
        </div>
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

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
      <img src="${person.photo}" alt="${person.name}" class="img-profile">
      <div>
        <a href="${person.website}" target="_blank"><strong>${person.name}</strong></a><br>
        <span>Research: ${person.research}</span>
      </div>
    `;
    container.appendChild(card);
  });
}

// Render events
async function renderEvents() {
  const events = await fetchData("data/events.json");
  const container = document.getElementById("seminars");
  container.innerHTML = "<h5>Upcoming Seminars</h5>";

  events.forEach(event => {
    const item = document.createElement("div");
    item.className = "mb-3";
    item.innerHTML = `
      <strong>${event.title}</strong><br>
      <span>${event.date}</span><br>
      <p>${event.description}</p>
    `;
    container.appendChild(item);
  });
}

// Initialize the default view
window.onload = function () {
  renderPeople("faculty"); // Show faculty by default
  renderEvents(); // Load events

  document.getElementById("faculty-tab").addEventListener("click", () => renderPeople("faculty"));
  document.getElementById("students-tab").addEventListener("click", () => renderPeople("students"));
};

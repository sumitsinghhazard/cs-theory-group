import { fetchData } from './loadComponents.js';

export async function renderSeminars() {
  const events = await fetchData("data/events.json");
  const container = document.getElementById("seminarsList");  // Updated to target list-group
  container.innerHTML = ""; // Clear previous content

  if (events.length === 0) {
    container.innerHTML = `
      <a href="#" class="list-group-item list-group-item-action disabled">
        No upcoming seminars scheduled.
      </a>
    `;
    return;
  }

  events.forEach((event, index) => {
    const seminarItem = document.createElement("a");
    seminarItem.className = "list-group-item list-group-item-action flex-column align-items-start";

    seminarItem.innerHTML = `
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">${event.title}</h5>
        <small>${event.date}</small>
      </div>
      <p class="mb-1">${event.description}</p>
    `;

    container.appendChild(seminarItem);
  });
}

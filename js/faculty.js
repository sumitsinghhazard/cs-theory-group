import { fetchData } from './loadComponents.js'; // Import fetchData function

export async function renderFaculty() {
  try {
    const data = await fetchData("data/faculty.json"); // Fetch faculty data
    const container = document.getElementById("faculty-content"); // Target the faculty-content div

    if (!container) {
      console.error("Faculty content container not found.");
      return;
    }

    container.innerHTML = ""; // Clear previous content

    if (data.length === 0) {
      container.innerHTML = "<p>No faculty members found.</p>"; // Handle empty data gracefully
      return;
    }

    // Create a card for each faculty member
    data.forEach(person => {
      const card = document.createElement("div");
      card.className = "list-group-item d-flex align-items-center";

      // Set the card's HTML content
      card.innerHTML = `
        <img src="${person.photo}" alt="${person.name}" class="img-profile me-3" 
             style="width: 75px; height: 75px;">
        <div>
          <a href="${person.website}" target="_blank"><strong>${person.name}</strong></a><br>
          <span>Research: ${person.research}</span>
        </div>
      `;

      container.appendChild(card); // Append the card to the container
    });

  } catch (error) {
    console.error("Error rendering faculty content:", error);
    const container = document.getElementById("faculty-content");
    if (container) {
      container.innerHTML = "<p>Error loading faculty data. Please try again later.</p>";
    }
  }
}

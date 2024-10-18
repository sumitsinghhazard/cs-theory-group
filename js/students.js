import { fetchData } from './loadComponents.js'; // Import fetchData function

export async function renderStudents() {
  try {
    const data = await fetchData("data/students.json"); // Fetch students data
    const container = document.getElementById("content");

    if (!container) {
      console.error("Content container not found.");
      return;
    }

    container.innerHTML = ""; // Clear previous content

    if (data.length === 0) {
      container.innerHTML = "<p>No students found.</p>"; // Handle empty data gracefully
      return;
    }

    // Create a card for each student
    data.forEach(person => {
      const card = document.createElement("div");
      card.className = "list-group-item d-flex align-items-center";

      // Set the card's HTML content
      card.innerHTML = `
        <img src="${person.photo}" alt="${person.name}" class="img-profile me-3" 
             style="width: 75px; height: 75px;">
        <div>
          <strong>${person.name}</strong><br>
          <span>${person.info}</span>
        </div>
      `;

      container.appendChild(card); // Append the card to the container
    });

  } catch (error) {
    console.error("Error rendering student content:", error);
    const container = document.getElementById("content");
    if (container) {
      container.innerHTML = "<p>Error loading student data. Please try again later.</p>";
    }
  }
}

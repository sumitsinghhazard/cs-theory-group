// faculty.js

export async function renderFaculty() {
  const data = await fetchData("data/faculty.json");
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

// students.js

export async function renderStudents() {
  const data = await fetchData("data/students.json");
  const container = document.getElementById("content");
  container.innerHTML = ""; // Clear previous content

  data.forEach(person => {
    const card = document.createElement("div");
    card.className = "list-group-item d-flex align-items-center";

    card.innerHTML = `
      <img src="${person.photo}" alt="${person.name}" class="img-profile me-3" style="width: 75px; height: 75px;">
      <div>
        <strong>${person.name}</strong><br>
        <span>${person.info}</span>
      </div>
    `;
    container.appendChild(card);
  });
}

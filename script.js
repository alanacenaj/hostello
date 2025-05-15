
function showHostForm() {
  document.getElementById("hostForm").style.display = "block";
  document.getElementById("userTypeSelect").style.display = "none";
  document.getElementById("listingSection").style.display = "none";
}

function showTraveler() {
  document.getElementById("listingSection").style.display = "block";
  document.getElementById("userTypeSelect").style.display = "none";
  document.getElementById("hostForm").style.display = "none";
}

const form = document.getElementById("form");
const listings = document.getElementById("listings");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("hostelName").value;
  const location = document.getElementById("location").value;
  const price = document.getElementById("price").value;
  const description = document.getElementById("description").value;
  const amenities = document.getElementById("amenities").value;
  const photo = document.getElementById("photo").value || "https://via.placeholder.com/250";

  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <img src="${photo}" alt="Hostel Image">
    <h3>${name}</h3>
    <p><strong>Location:</strong> ${location}</p>
    <p><strong>Price:</strong> ${price}</p>
    ${description ? `<p>${description}</p>` : ""}
    ${amenities ? `<p><strong>Amenities:</strong> ${amenities}</p>` : ""}
  `;
  listings.appendChild(card);

  form.reset();
  alert("Hostel submitted!");
});

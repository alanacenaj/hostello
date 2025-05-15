// Firebase config (replace this with your actual config if needed)
const firebaseConfig = {
  apiKey: "AIzaSyAR6D8UStuhiAPKmvyoaRtwvotUszQbPqQ",
  authDomain: "hostello-11bd9.firebaseapp.com",
  databaseURL: "https://hostello-11bd9-default-rtdb.firebaseio.com",
  projectId: "hostello-11bd9",
  storageBucket: "hostello-11bd9.appspot.com",
  messagingSenderId: "344144011394",
  appId: "1:344144011394:web:085edd9555b385203d49b"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();

function showHostForm() {
  document.getElementById("hostForm").classList.remove("hidden");
  document.getElementById("userTypeSelect").classList.add("hidden");
  document.getElementById("listingSection").classList.add("hidden");
  document.getElementById("chatSection").classList.add("hidden");
}

function showTraveler() {
  document.getElementById("listingSection").classList.remove("hidden");
  document.getElementById("userTypeSelect").classList.add("hidden");
  document.getElementById("hostForm").classList.add("hidden");
  document.getElementById("chatSection").classList.remove("hidden");
}

const form = document.getElementById("form");
const listings = document.getElementById("listings");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const hostel = {
    name: document.getElementById("hostelName").value,
    location: document.getElementById("location").value,
    price: document.getElementById("price").value,
    description: document.getElementById("description").value,
    amenities: document.getElementById("amenities").value,
    photo: document.getElementById("photo").value || "https://via.placeholder.com/250"
  };

  const newRef = db.ref("hostels").push();
  newRef.set(hostel);

  form.reset();
  alert("Hostel submitted!");
});

// Load listings
db.ref("hostels").on("child_added", function(snapshot) {
  const data = snapshot.val();
  const card = document.createElement("div");
  card.className = "bg-white p-4 rounded shadow";
  card.innerHTML = `
    <img src="${data.photo}" class="rounded mb-2" alt="Hostel Image">
    <h3 class="text-lg font-bold">${data.name}</h3>
    <p class="text-sm text-gray-600"><strong>Location:</strong> ${data.location}</p>
    <p class="text-sm text-gray-600"><strong>Price:</strong> ${data.price}</p>
    ${data.description ? `<p class="text-sm">${data.description}</p>` : ""}
    ${data.amenities ? `<p class="text-sm text-gray-600"><strong>Amenities:</strong> ${data.amenities}</p>` : ""}
  `;
  listings.appendChild(card);
});

// Chat
function sendMessage() {
  const message = document.getElementById("chatInput").value;
  if (!message.trim()) return;

  db.ref("chat").push({
    sender: "Traveler",
    message: message
  });

  document.getElementById("chatInput").value = "";
}

db.ref("chat").on("child_added", function(snapshot) {
  const msg = snapshot.val();
  const chatBox = document.getElementById("chatBox");
  const msgDiv = document.createElement("div");
  msgDiv.textContent = `${msg.sender}: ${msg.message}`;
  chatBox.appendChild(msgDiv);
});

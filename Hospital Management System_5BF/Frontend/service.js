const loadServices = () => {
  fetch("http://127.0.0.1:8000/service/services/")
    .then((res) => res.json())
    .then((data) => displayService(data))
    .catch((err) => console.log(err));
};

const displayService = (services) => {
  const parent = document.querySelector(".services-container");
  parent.innerHTML = "";
  services.forEach((service) => {
    const div = document.createElement("div");
    div.classList.add("service");
    div.innerHTML = `
      <div class="service-image">
        <img src="${service.image}" alt="${service.name}" />
      </div>
      <div class="service-info">
        <h1>${service.name}</h1>
        <p>${service.description}</p>
        <h4>Fees: ${service.fee}</h4>
        <button onclick="openModal(${service.id}, '${service.name}')">Book</button>
      </div>
    `;
    parent.appendChild(div);
    parent.appendChild(document.createElement("hr"));
  });
};

const openModal = (serviceId, serviceName) => {
  const modal = document.getElementById("bookingModal");
  const modalTitle = modal.querySelector("h2");
  modalTitle.textContent = `Book ${serviceName}`;
  localStorage.setItem("service_id", serviceId);
  modal.style.display = "block";
};

const closeModal = () => {
  const modal = document.getElementById("bookingModal");
  modal.style.display = "none";
};

const handleServiceBooking = () => {
  const serviceId = localStorage.getItem("service_id");
  const token = localStorage.getItem("token");
  const preferableDate = document.getElementById("date").value.trim();

  if ( !token) {
    alert("Please Signup or Login first!");
    return;
  }
  if (!serviceId || !preferableDate) {
    alert("Please select a date!");
    return;
  }

  const bookingInfo = {
    service: serviceId,
    preferable_date: preferableDate,
  };
  console.log("Booking Info:", bookingInfo);
  fetch("http://127.0.0.1:8000/service/service-booking/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(bookingInfo),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Booking failed");
      return res.json();
    })
    .then((data) => {
      alert("Service booked successfully!");
      closeModal();
    })
    .catch((error) => {
      alert(`${error.message}`);
    });
};

// Attach close button event
document.querySelector(".close").addEventListener("click", closeModal);

// Load services when page loads
loadServices();

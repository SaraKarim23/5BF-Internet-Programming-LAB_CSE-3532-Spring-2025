const openModal = () => {
  const modal = document.getElementById("appointment-modal");
  modal.style.display = "block";
};

const closeModal = () => {
  const modal = document.getElementById("appointment-modal");
  modal.style.display = "none";
};

const loadTime = () => {
  const id = new URLSearchParams(window.location.search).get("id");
  const parent = document.getElementById("time-container");

  fetch(`http://127.0.0.1:8000/doctor/available_time/?doctor_id=${id}`)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((item) => {
        const option = document.createElement("option");
        option.value = item.id;
        option.innerText = item.time;
        parent.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Error fetching times:", error);
    });
};

window.addEventListener("DOMContentLoaded", loadTime);

const handleAppointment = () => {
  const param = localStorage.getItem("doctor_id");
  const status = document.getElementsByName("status");
  const selected = Array.from(status).find((button) => button.checked);
  const symptom = document.getElementById("symptom").value;
  const time = document.getElementById("time-container");
  const selectedTime = time.options[time.selectedIndex];
  const patient_id = localStorage.getItem("patient_id");
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please Signup or Login first!");
    return;
  }
  if (!selected || !symptom || !selectedTime.value) {
    alert("Please fill all the required fields!");
    return;
  }

  const info = {
    appointment_types: selected.value,
    appointment_status: "Pending",
    time: selectedTime.value,
    symptom: symptom,
    cancel: false,
    patient: patient_id,
    doctor: param,
  };

  fetch("http://127.0.0.1:8000/appointment/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${token}`
    },
    body: JSON.stringify(info),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to create appointment");
      return res.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      alert(error.message);
    });
  closeModal();
};


const submitReview = (event) => {
  event.preventDefault();
  const token = localStorage.getItem('token');
  const reviewer = localStorage.getItem('patient_id')
  const doctorId = localStorage.getItem('doctor_id');
  const rating = document.getElementById('rating').value;
  const body = document.getElementById('body').value;

  const info = {
    reviewer: reviewer,
    doctor: doctorId,
    rating: rating,
    body: body,
  };

  fetch('http://127.0.0.1:8000/doctor/reviews/', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${token}`
    },
    body: JSON.stringify(info),
  })
    .then((res) => {
      if (!res.ok) throw res;
      return res.json();
    })
    .then((data) => {
      alert('Review submitted successfully!');
      document.getElementById('reviewForm').reset();
    })
    .catch(async (err) => {
      let errorMsg = 'Something went wrong.';
      try {
        const errData = await err.json();
        errorMsg = JSON.stringify(errData);
      } catch (e) { }
      alert(errorMsg);
    });
};

document.getElementById('reviewForm').addEventListener('submit', submitReview);

if (localStorage.getItem("token")) {
  document.getElementById("reviewFormContainer").style.display = "block";
}


const loadDoctorReviews = () => {
  const doctorId = localStorage.getItem('doctor_id');
  fetch(`http://127.0.0.1:8000/doctor/reviews/?doctor=${doctorId}`)
    .then((res) => res.json())
    .then((data) => displayReview(data))
    .catch((error) => console.error("Error loading doctor reviews:", error));
};

const displayReview = (reviews) => {
  const parent = document.querySelector("#carousel");
  parent.innerHTML = "";

  if (reviews.length === 0) {
    parent.innerHTML = `<p>No reviews yet for this doctor.</p>`;
    return;
  }

  reviews.forEach((review) => {
    const div = document.createElement("div");
    div.classList.add("review-card");
    div.innerHTML = `
      <img src="${review.reviewer_image}" alt="reviewer" />
      <h4>${review.reviewer_name}</h4>
      <p>${review.body ? review.body.slice(0, 100) : "No review text available."}</p>
      <h6>⭐ ${review.rating}</h6>
    `;
    parent.appendChild(div);
  });
};

// Call this function when the doctor details page loads
loadDoctorReviews();

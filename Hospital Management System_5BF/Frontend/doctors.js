// doctors page
const doctors = [
  {
    id: 0,
    full_name: "Dr. Ayesha Khan",
    image: "Images/doc1.jpg",
    designation: ["Senior Consultant"],
    specialization: ["Cardiologist"],
    fee: 2000,
    education: "MBBS, MD (Cardiology) - Harvard Medical School",
  },
  {
    id: 1,
    full_name: "Dr. James Smith",
    image: "Images/doc2.jpg",
    designation: ["Medical Officer"],
    specialization: ["Dermatologist"],
    fee: 1500,
    education: "MBBS, Diploma in Dermatology - Johns Hopkins University",
  },
  {
    id: 2,
    full_name: "Dr. Lisa Brown",
    image: "Images/doc4.jpg",
    designation: ["Assistant Professor"],
    specialization: ["Neurologist"],
    fee: 1800,
    education: "MBBS, MD (Neurology) - Stanford University",
  },
  {
    id: 3,
    full_name: "Dr. Ahmed Rahman",
    image: "Images/doc3.jpg",
    designation: ["Surgeon"],
    specialization: ["Orthopediatritian"],
    fee: 2500,
    education: "MBBS, MS (Orthopedics) - University of Toronto",
  },
  {
    id: 4,
    full_name: "Dr. Emily Watson",
    image: "Images/doc1.jpg",
    designation: ["Resident Doctor"],
    specialization: ["Peadiatritians"],
    fee: 1200,
    education: "MBBS, MD (Pediatrics) - Yale University",
  },
  {
    id: 5,
    full_name: "Dr. Robert Green",
    image: "Images/doc3.jpg",
    designation: ["Professor"],
    specialization: ["Internal medicine"],
    fee: 2200,
    education: "MBBS, MD (Internal Medicine) - Oxford University",
  },
  {
    id: 6,
    full_name: "Dr. Sophia White",
    image: "Images/doc4.jpg",
    designation: ["Senior Consultant"],
    specialization: ["Cardiologist"],
    fee: 2000,
    education: "MBBS, MD (Cardiology) - Cambridge University",
  },
  {
    id: 7,
    full_name: "Dr. David Johnson",
    image: "Images/doc2.jpg",
    designation: ["Medical Officer"],
    specialization: ["Dermatologist"],
    fee: 1500,
    education:
      "MBBS, Diploma in Dermatology - University of California, San Francisco",
  },
  {
    id: 8,
    full_name: "Dr. Olivia Martinez",
    image: "Images/doc1.jpg",
    designation: ["Assistant Professor"],
    specialization: ["Neurologist"],
    fee: 1800,
    education: "MBBS, MD (Neurology) - Duke University",
  },
  {
    id: 9,
    full_name: "Dr. Henry Wilson",
    image: "Images/doc3.jpg",
    designation: ["Surgeon"],
    specialization: ["Orthopediatritian"],
    fee: 2500,
    education: "MBBS, MS (Orthopedics) - University of Sydney",
  },
  {
    id: 10,
    full_name: "Dr. Maria Garcia",
    image: "Images/doc4.jpg",
    designation: ["Resident Doctor"],
    specialization: ["Peadiatritians"],
    fee: 1200,
    education: "MBBS, MD (Pediatrics) - Columbia University",
  },
  {
    id: 11,
    full_name: "Dr. Ethan Miller",
    image: "Images/doc3.jpg",
    designation: ["Professor"],
    specialization: ["Internal medicine"],
    fee: 2200,
    education: "MBBS, MD (Internal Medicine) - University of Chicago",
  },
  {
    id: 12,
    full_name: "Dr. Isabella Brown",
    image: "Images/doc1.jpg",
    designation: ["Senior Consultant"],
    specialization: ["Cardiologist"],
    fee: 2000,
    education: "MBBS, MD (Cardiology) - Imperial College London",
  },
  {
    id: 13,
    full_name: "Dr. Daniel Thomas",
    image: "Images/doc2.jpg",
    designation: ["Medical Officer"],
    specialization: ["Physiatrist"],
    fee: 1600,
    education: "MBBS, MD (Physical Medicine) - University of Michigan",
  },
  {
    id: 14,
    full_name: "Dr. Charlotte Scott",
    image: "Images/doc4.jpg",
    designation: ["Assistant Professor"],
    specialization: ["General surgery"],
    fee: 2100,
    education: "MBBS, MS (General Surgery) - University of Pennsylvania",
  },
  {
    id: 15,
    full_name: "Dr. Logan Harris",
    image: "Images/doc4.jpg",
    designation: ["Surgeon"],
    specialization: ["Orthopediatritian"],
    fee: 2500,
    education: "MBBS, MS (Orthopedics) - University of Melbourne",
  },
  {
    id: 16,
    full_name: "Dr. Amelia Robinson",
    image: "Images/doc4.jpg",
    designation: ["Resident Doctor"],
    specialization: ["Peadiatritians"],
    fee: 1200,
    education: "MBBS, MD (Pediatrics) - Johns Hopkins University",
  },
  {
    id: 17,
    full_name: "Dr. Michael Carter",
    image: "Images/doc2.jpg",
    designation: ["Professor"],
    specialization: ["Internal medicine"],
    fee: 2200,
    education: "MBBS, MD (Internal Medicine) - University of Toronto",
  },
  {
    id: 18,
    full_name: "Dr. Benjamin Lee",
    image: "Images/doc4.jpg",
    designation: ["Senior Consultant"],
    specialization: ["Physiatrist"],
    fee: 1900,
    education: "MBBS, MD (Physical Medicine) - Harvard Medical School",
  },
  {
    id: 19,
    full_name: "Dr. Grace Adams",
    image: "Images/doc2.jpg",
    designation: ["Medical Officer"],
    specialization: ["Dermatologist"],
    fee: 1500,
    education: "MBBS, Diploma in Dermatology - University of Washington",
  },
];

const groupDoctorsBySpecialization = () => {
  Promise.all([
    fetch("http://127.0.0.1:8000/doctor/list/").then((res) => res.json()),
    fetch("http://127.0.0.1:8000/doctor/specialization/").then((res) => res.json()),
  ])
    .then(([doctorsData, specializationData]) => {
      displayDoctorsBySpecialization(specializationData, doctorsData);
    })
    .catch((err) => console.error("something went wrong:", err));
};

const displayDoctorsBySpecialization = (specializations, doctors) => {
  const parent = document.querySelector(".doctors-container");
  parent.innerHTML = "";

  specializations.forEach((specialization) => {
    const div = document.createElement("div");
    div.classList.add("spe-doc");
    div.innerHTML = `
      <div class="spe-name">
        <h1>${specialization.name}</h1>
        <hr />
      </div>
      <div class="docs"></div>
    `;

    const doctorsInSpecialization = doctors.filter(
      (doctor) => doctor.specialization === specialization.name
    );

    const docsParent = div.querySelector(".docs");

    doctorsInSpecialization.forEach((doctor) => {
      const doctorCard = document.createElement("div");
      doctorCard.classList.add("doc-card");
      doctorCard.innerHTML = `
        <img class="doc-img" src="${doctor.image}" alt="Doctor Image" />
        <h4>${doctor.full_name}</h4>
        <h5>${doctor.specialization}</h5>
        <p>${doctor.bio.substring(0, 100)}...</p>
        <h4>Fees: ${doctor.fee}</h4>
        <button onclick="viewDoctorDetails(${doctor.id})">Details</button>
      `;
      docsParent.appendChild(doctorCard);
    });

    parent.appendChild(div);
  });
};

const viewDoctorDetails = (id) => {
  localStorage.setItem("doctor_id", id);
  window.location.href = `doctorDetails.html?id=${id}`;
};

const loadDoctors = (search) => {
  document.getElementById("doctors-container").innerHTML = "";
  document.getElementById("spinner").style.display = "block";
  fetch(`http://127.0.0.1:8000/doctor/list/?search=${search ? search : ""
    }`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.length > 0) {
        document.getElementById("spinner").style.display = "none";
        document.getElementById("nodata").style.display = "none";
        displayDoctors(data);
      } else {
        document.getElementById("doctors").innerHTML = "";
        document.getElementById("spinner").style.display = "none";
        document.getElementById("nodata").style.display = "block";
      }
    });
}

const displayDoctors = (doctors) => {
  const container = document.getElementById("doctors-container");
  container.innerHTML = "";

  doctors.forEach((doctor) => {
    const doctorCard = document.createElement("div");
    doctorCard.classList.add("doc-card");
    doctorCard.innerHTML = `
      <img class="doc-img" src="${doctor.image}" alt="Doctor Image" />
      <h4>${doctor.full_name}</h4>
      <h5>${doctor.specialization}</h5>
      <p>${doctor.bio.substring(0, 100)}...</p>
      <h4>Fees: ${doctor.fee}</h4>
      <button onclick="viewDoctorDetails(${doctor.id})">Details</button>
    `;
    container.appendChild(doctorCard);
  });
};

const handleDoctorSearch = () => {
  const value = document.getElementById("search").value.trim();
  loadDoctors(value);
};

groupDoctorsBySpecialization();

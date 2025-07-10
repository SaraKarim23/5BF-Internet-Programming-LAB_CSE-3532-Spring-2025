const loadServices = () => {
  fetch("http://127.0.0.1:8000/service/services/")
    .then((res) => res.json())
    .then((data) => displayService(data))
    .catch((err) => console.log(err));
};

const displayService = (services) => {
  const parent = document.querySelector(".carousel");
  parent.innerHTML = "";
  services.forEach((service) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
            <img src="${service.image}" alt="${service.name}" />
            <h3>${service.name}</h3>
            <p>${service.description.slice(0, 100)}...</p>
        `;
    parent.appendChild(div);
  });
};

let scrollAmount = 0;
const scrollMax = 600;

document.querySelector(".next").addEventListener("click", () => {
  scrollAmount += 300;
  if (scrollAmount > scrollMax) scrollAmount = 0;
  document.querySelector(
    ".carousel"
  ).style.transform = `translateX(-${scrollAmount}px)`;
});

document.querySelector(".prev").addEventListener("click", () => {
  scrollAmount -= 300;
  if (scrollAmount < 0) scrollAmount = scrollMax;
  document.querySelector(
    ".carousel"
  ).style.transform = `translateX(-${scrollAmount}px)`;
});

const redirect = () => {
  window.location.href = "service.html";
};


const loadDoctors = (search) => {
  document.getElementById("doctors").innerHTML = "";
  document.getElementById("spinner").style.display = "block";
  fetch(`http://127.0.0.1:8000/doctor/list/?search=${search ? search : ""
    }`)
    .then((res) => res.json())
    .then((data) => {
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
const displayDoctors = (doctorsList) => {
  const parent = document.getElementById("doctors");
  parent.innerHTML = "";
  doctorsList = doctorsList.slice(0, 6);
  doctorsList.forEach((doctor, index) => {
    const div = document.createElement("div");
    div.classList.add("doc-card");
    div.innerHTML = `
            <img class="doc-img" src="${doctor.image}" alt="Doctor Image" />
            <h4>${doctor.full_name}</h4>
            <h5>${doctor.specialization}</h5>
           <p>${doctor.bio.slice(0, 100)}...</p>
            <button onclick="viewDoctorDetails(${doctor.id})">Details</button>
        `;
    parent.appendChild(div);
  });
};


const handleSearch = () => {
  const value = document.getElementById("search").value.trim();
  loadDoctors(value);
};

const viewDoctorDetails = (id) => {
  localStorage.setItem("doctor_id", id);
  window.location.href = `doctorDetails.html?id=${id}`;
};

const loadSpecialization = () => {
  fetch("http://127.0.0.1:8000/doctor/specialization/")
    .then((res) => res.json())
    .then((data) => {
      const parent = document.getElementById("drop-spe");
      parent.innerHTML = data
        .map(
          (item) =>
            `<li onclick="loadDoctors('${item.name}')">${item.name}</li>`
        )
        .join(" ");
    })
    .catch(() => console.log("Failed to load specializations."));
};

const loadReview = () => {
  fetch("http://127.0.0.1:8000/doctor/reviews/")
    .then((res) => res.json())
    .then((data) => displayReview(data))
    .catch((error) => console.error("Error loading reviews:", error));
};

const displayReview = (reviews) => {
  const parent = document.querySelector("#carousel"); 
  parent.innerHTML = "";
  reviews.forEach((review) => {
    const div = document.createElement("div");
    div.classList.add("review-card");
    div.innerHTML = `
          <img src="${review.reviewer_image}"  />
          <h4>${review.reviewer_name}</h4>
          <p>${review.body
        ? review.body.slice(0, 100)
        : "No review text available."
      }</p>
          <h6>⭐ ${review.rating}</h6>
        `;
    parent.appendChild(div);
  });
};

const loadBlogs = () => {
  fetch("http://127.0.0.1:8000/blog/")
    .then((res) => res.json())
    .then((data) => displayBlogs(data))
    .catch((err) => console.log(err));
}

const displayBlogs = (blogs) => {
  const parent = document.getElementById("blog-list");
  parent.innerHTML = "";
  blogs.forEach((blog) => {
    const div = document.createElement("div");
    div.classList.add("blog-card");
    div.innerHTML = `
            <img src="${blog.image}" alt="Blog Image">
            <h4>${blog.title}</h4>
            <p>${blog.content.slice(0, 80)}...</p>
            <a href="blog.html?id=${blog.id}" onclick="saveBlog(${blog.id
      })">Read More</a>
        `;
    parent.appendChild(div);
  });
};

const saveBlog = (id) => {
  const blogData = blogs.find((blog) => blog.id === id);
  localStorage.setItem("selectedBlog", JSON.stringify(blogData));
};

loadBlogs();
loadReview();
loadDoctors();
loadServices();
loadSpecialization();
loadReview();

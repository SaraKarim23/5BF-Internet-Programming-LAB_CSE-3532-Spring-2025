const handlelogOut = () => {
  const token = localStorage.getItem("token");

  fetch("http://127.0.0.1:8000/patient/logout/", {
    method: "POST",
    headers: {
      "Authorization": `Token ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      localStorage.removeItem("patient_id");
      localStorage.removeItem("service_id");
      localStorage.removeItem("doctor_id");
      window.location.href = "index.html";
    });
};

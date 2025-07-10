document.getElementById("changePasswordForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const token = localStorage.getItem("token");
  const current_password = document.getElementById("current_password").value;
  const new_password = document.getElementById("new_password").value;
  const confirm_password = document.getElementById("confirm_password").value;

  fetch("http://127.0.0.1:8000/patient/change-password/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${token}`
    },
    body: JSON.stringify({
      current_password,
      new_password,
      confirm_password
    })
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message) {
        alert(data.message);
        document.getElementById("changePasswordForm").reset();
      } else {
        alert(data.error || "Something went wrong.");
      }
    });
});

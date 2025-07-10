const form = document.getElementById('editProfileForm');

form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const token = localStorage.getItem("token");

    const response = await fetch('http://127.0.0.1:8000/patient/edit-profile/', {
        method: 'PUT',
        headers: {
            "Authorization": "Token " + token
        },
        body: formData
    });

    const data = await response.json();
    if (response.ok) {
        alert("Profile updated successfully!");
        form.reset();
    } else {
        console.error("Error:", data);
        alert("Failed to update profile. Please try again.");
    }
});

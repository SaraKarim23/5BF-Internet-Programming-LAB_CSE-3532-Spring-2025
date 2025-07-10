const handleregistration = (event) => {
    event.preventDefault();

    const username = getvalue("username");
    const first_name = getvalue("first_name");
    const last_name = getvalue("last_name");
    const email = getvalue("email");
    const password = getvalue("password");
    const confirm_password = getvalue("confirm_password");

    if (password === confirm_password) {
        const strongPasswordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

        if (strongPasswordPattern.test(password)) {
            const data = {
                username,
                first_name,
                last_name,
                email,
                password,
                confirm_password
            };

            fetch("http://127.0.0.1:8000/patient/register/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then((res) => res.json())
                .then((data) => {
                    alert("Registration successful! Check email for confirmation");
                    document.getElementById("register-form").reset();  // Optional
                })
                .catch((err) => {
                    console.error("Registration failed:", err);
                    alert("Something went wrong. Try again.");
                });
        } else {
            alert("Password must contain minimum eight characters, at least one letter, one number and one special character");
        }
    } else {
        alert("Password & Confirm Password do not match");
    }
};

const getvalue = (id) => {
    return document.getElementById(id).value.trim();
};


const handlelogin = (event) => {
    event.preventDefault();
    const username = getvalue("username");
    const password = getvalue("password");
    fetch("http://127.0.0.1:8000/patient/login/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.token) {
                localStorage.setItem("user_id", data.user_id);
                localStorage.setItem("token", data.token);
                localStorage.setItem("patient_id", data.patient_id);
                window.location.href = "index.html";
            } else {
                alert("Invalid username or password");
            }
        })
        .catch((err) => {
            console.error(err);
            alert("Invalid username or password");
        });
}
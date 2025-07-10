const loadAllAppointment = () => {
    const patient_id = localStorage.getItem("patient_id");
    const token = localStorage.getItem("token");
    const tableBody = document.querySelector("tbody");

    fetch(`http://127.0.0.1:8000/appointment/?patient_id=${patient_id}`, {
      headers: {
        "Authorization": `Token ${token}`
      }
    })
    .then(res => {
      if (!res.ok) throw new Error("Failed to load appointments.");
      return res.json();
    })
    .then(data => {
      tableBody.innerHTML = ""; // Clear existing demo rows

      if (data.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="7">No appointments found.</td></tr>`;
        return;
      }

      data.forEach((appointment, index) => {
        const row = document.createElement("tr");

        const statusClass = appointment.appointment_status.toLowerCase(); // pending/running/completed
        const typeClass = appointment.appointment_types.toLowerCase(); // online/offline

        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${appointment.scheduled_date || 'N/A'}</td>
          <td>${appointment.doctor_name}</td>
          <td>${appointment.doctor_specialization || 'N/A'}</td>
          <td class="${typeClass}">${appointment.appointment_types} &#x2022;</td>
          <td class="${statusClass}">${appointment.appointment_status}</td>
          <td>${appointment.fees || 'N/A'}TK</td>
        `;

        tableBody.appendChild(row);
      });
    })
    .catch(err => {
      console.error(err);
      alert("Error fetching appointments.");
    });
  };
  
  loadAllAppointment();
const loadAllBookedService = () => {
  const patient_id = localStorage.getItem("patient_id");
  const token = localStorage.getItem("token");
  const tableBody = document.querySelector("tbody");

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  };

  const formatDateTime = (dateTimeStr) => {
    if (!dateTimeStr) return "N/A";
    const date = new Date(dateTimeStr);
    return date.toLocaleString();
  };

  fetch(`http://127.0.0.1:8000/service/service-booking/?patient_id=${patient_id}`, {
    headers: {
      "Authorization": `Token ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to load appointments.");
      return res.json();
    })
    .then((data) => {
      tableBody.innerHTML = "";

      if (data.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="6">No Bookings found.</td></tr>`;
        return;
      }

      data.forEach((booking,index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${booking.service_name || "N/A"}</td>
          <td>${formatDateTime(booking.booked_at)}</td>
          <td>${formatDate(booking.preferable_date)}</td>
          <td>${booking.scheduled_date ? formatDate(booking.scheduled_date) : '<em>Not Scheduled</em>'}</td>
          <td>${booking.is_confirmed ? "✅ Confirmed" : "❌ Pending"}</td>
        `;

        tableBody.appendChild(row);
      });
    })
    .catch((err) => {
      console.error(err);
      alert("Error fetching appointments.");
    });
};

loadAllBookedService();

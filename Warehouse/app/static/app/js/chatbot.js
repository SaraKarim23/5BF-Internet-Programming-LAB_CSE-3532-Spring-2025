/** @format */

// Toggle chat popup visibility
function toggleChatbox() {
  var chatPopup = document.getElementById("chat-popup");
  if (chatPopup.style.display === "none" || chatPopup.style.display === "") {
    chatPopup.style.display = "flex"; // Show the chat box
  } else {
    chatPopup.style.display = "none"; // Hide the chat box
  }
}

// Send message to the server and get the response
function sendMessage() {
  var userMessage = document.getElementById("chat-message").value;
  if (userMessage.trim() !== "") {
    var chatBody = document.getElementById("chat-body");
    chatBody.innerHTML += "<p><strong>You:</strong> " + userMessage + "</p>";
    document.getElementById("chat-message").value = "";

    // Debugging: Log the message to the console
    console.log("Sending message:", userMessage);

    // Make an AJAX request to the server for bot response
    fetch("/chat/get_response/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-CSRFToken": getCookie("csrftoken"), // Attach CSRF token
      },
      body: "message=" + encodeURIComponent(userMessage),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response from bot:", data); // Log the response
        var botMessage = data.response || "Sorry, I could not understand that.";
        chatBody.innerHTML += "<p><strong>Bot:</strong> " + botMessage + "</p>";
        chatBody.scrollTop = chatBody.scrollHeight;
      })
      .catch((error) => {
        console.error("Error:", error); // Log any errors
        chatBody.innerHTML +=
          "<p><strong>Bot:</strong> Sorry, there was an error. Please try again later.</p>";
      });
  }
}

// Helper function to get CSRF token from cookies
function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

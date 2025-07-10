import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const More = () => {
  const [feedbackData, setFeedbackData] = useState([]);

  useEffect(() => {
    fetchFeedbackData();
  }, []);

  const fetchFeedbackData = () => {
    fetch("http://localhost:5000/feedback")
      .then((res) => res.json())
      .then((data) => {
        setFeedbackData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error here
      });
  };

  const handleAddFeedBack = (event) => {
    event.preventDefault();
    const form = event.target;
    const feedback = form.text.value;
    const feedbackData = { feedback: feedback };

    fetch("http://localhost:5000/feedback", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(feedbackData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Feedback added successfully!",
            icon: "success",
            confirmButtonText: "Thank You",
          });
          form.reset(); // Reset the form after successful submission
          // Fetch feedback data again to update the list
          fetchFeedbackData();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error here
      });
  };

  return (
    <div className="min-h-screen mt-10 ">
      <div className="collapse collapse-plus bg-base-200 mb-6">
        <input type="radio" name="my-accordion-3" defaultChecked />
        <div className="collapse-title text-xl font-medium">
          How often can I donate blood?
        </div>
        <div className="collapse-content">
          <p>You can donate whole blood every 56 days.</p>
        </div>
      </div>
      <div className="collapse collapse-plus bg-base-200 mb-6">
        <input type="radio" name="my-accordion-3" defaultChecked />
        <div className="collapse-title text-xl font-medium">
          What are the eligibility criteria for blood donation?
        </div>
        <div className="collapse-content">
          <p>
            To be eligible, you must meet certain age, weight, and health
            requirements. Generally, donors must be at least 17 years old,
            weigh at least 110 pounds, and be in good health.
          </p>
        </div>
      </div>
      <div className="collapse collapse-plus bg-base-200 mb-6">
        <input type="radio" name="my-accordion-3" defaultChecked />
        <div className="collapse-title text-xl font-medium">
          Can I donate blood if I have a medical condition?
        </div>
        <div className="collapse-content">
          <p>
            It depends on the medical condition. Some conditions may disqualify
            you from donating blood, while others may not.
          </p>
        </div>
      </div>
      <div className="collapse collapse-plus bg-base-200 mb-6">
        <input type="radio" name="my-accordion-3" defaultChecked />
        <div className="collapse-title text-xl font-medium">
          How long does the blood donation process take?
        </div>
        <div className="collapse-content">
          <p>
            The donation process typically takes about 1 hour, including
            registration, medical history screening, donation, and
            refreshments.
          </p>
        </div>
      </div>
      <div className="collapse collapse-plus bg-base-200 mb-6">
        <input type="radio" name="my-accordion-3" defaultChecked />
        <div className="collapse-title text-xl font-medium">
          Can I donate blood if I have recently traveled to a different
          country?
        </div>
        <div className="collapse-content">
          <p>
            It depends on the country you have visited and any potential health
            risks associated with travel. In some cases, travel may temporarily
            defer your eligibility to donate blood.
          </p>
        </div>
      </div>

      <form onSubmit={handleAddFeedBack}>
        <input
          className="py-36 px-32 w-full bg-cyan-800 text-white"
          type="text"
          name="text"
          id=""
          placeholder="Enter Your Feedback "
        />
        <input
          type="submit"
          value="Submit"
          className="btn btn-block mt-4 bg-gradient-to-r from-cyan-800  to-cyan-500 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-800 text-xl  px-4 py-2 rounded-md text-white"
        />
      </form>
      
      <ul className="text-xl text-cyan-800 py-4">
        {feedbackData.map((feedback, index) => (
          <li key={index}>
            {index + 1}. {feedback.feedback}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default More;







import Aos from "aos";
import { useEffect, useState } from "react";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("/reviews.json")
      .then((response) => response.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <div>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-y-5 lg:gap-y-2 lg:gap-x-2 lg:me-0 lg:ms-0 me-6 ms-6">
        {reviews.map((review) => (
          <div
            data-aos="fade-up"
            className="bg-cyan-950 text-white p-1  rounded-md"
            key={review.id}
          >
            <div className=" px-3 items-center rounded-md bg-cyan-700">
              <div className="flex justify-center gap-2 p-2 lg:p-0">
                <div className="">
                  <img
                    src={`${review.picture}`}
                    alt={review.name}
                    className="w-16 h-16 rounded-full  mt-3 shadow-lg "
                  />
                </div>
                <div className="w-[100%]">
                  <h3 className="font-semibold">{review.name}</h3>
                  <p className="text-sm mb-2">{review.review}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;

import Aos from "aos";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";



const ServiceCards = () => {
    const [serviceData, setServiceData] = useState([]);

    useEffect(() => {
        fetch("/services.json")
            .then((response) => response.json())
            .then((data) => setServiceData(data))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    useEffect(() => {
        Aos.init();
    }, [])

    return (
        <div >
            {serviceData.map((service) => (
                <div data-aos="fade-up"
                    key={service.id}>
                    <div

                        className="md:flex md:justify-center mb-12 mt-4 md:gap-3 lg:gap-10  lg:ms-0 lg:me-0 ms-6 me-6">
                        <div className="md:w-[50%]">
                            <img className="rounded-md shadow-md lg:h-[300px] h-[240px] w-[100%] md:w-[340px] lg:w-[500px]" src={`${service.image}`} alt={service.name} />
                        </div>
                        <div className="md:w-[50%]">
                            <h2 className="lg:text-3xl md:text-2xl text-xl text-gradient font-bold mt-6 md:mt-0">{service.name}</h2>
                            <p className="md:text-xl text-base mb-2  mt-2 text-justify">
                                {service.description.slice(0, 200)}...
                            </p>
                            <p className="text-xl font-semibold">Price: Free of Cost{service.price}</p>
                            <div className="flex justify-between mt-3">
                                <div></div>
                                <Link to={`/services/${service.id}`}>
                                    <div>
                                        <img className="w-12" src="https://img.icons8.com/ios/50/circled-right-2.png" alt="circled-right-2" />
                                    </div>
                                </Link>

                            </div>

                        </div>
                    </div>


                </div>
            ))}
        </div>
    );
};

export default ServiceCards;




import React, { useRef } from "react";
import Swal from "sweetalert2";

const Admin = () => {
  const formRef = useRef(null);

  const handleAddDonor = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const age = form.age.value;
    const group = form.group.value;
    const phone = form.phone.value;
    const gender = form.gender.value;
    const address = form.address.value;
    const photo = form.photo.value;
    const newDonor = {
      name,
      age,
      group,
      phone,
      gender,
      address,
      photo,
    };

    // send data to server
    fetch("http://localhost:5000/donor", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newDonor),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Donor added successfully !!",
            icon: "success",
            confirmButtonText: "Thank You",
          });

          formRef.current.reset();
        }
      });
  };

  const handleAddPatient = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const age = form.age.value;
    const group = form.group.value;
    const phone = form.phone.value;
    const gender = form.gender.value;
    const address = form.address.value;
    const photo = form.photo.value;
    const newPatient = {
      name,
      age,
      group,
      phone,
      gender,
      address,
      photo,
    };

    // send data to server
    fetch("http://localhost:5000/patient", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newPatient),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Patient added successfully !!",
            icon: "success",
            confirmButtonText: "Thank You",
          });

          formRef.current.reset();
        }
      });
  };





  

  return (
    <div className="bg-cyan-800 p-6 md:p-24 ">
      <h1 className="text-3xl text-center mb-4 md:mb-8 font-bold text-white">
        Donor Details
      </h1>
      <form onSubmit={handleAddDonor} ref={formRef}>
        <div className="lg:flex flex-row">
          <div className="form-control md:w-1/2">
            <label className="label">
              <span className="label-text text-white">Donor Name</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                name="name"
                placeholder="Donor Name"
                className="input input-bordered w-full"
              />
            </label>
          </div>

          <div className="form-control md:w-1/2 ml-2 md:ml-4">
            <label className="label">
              <span className="label-text text-white">Age</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                name="age"
                placeholder="Age"
                className="input input-bordered w-full"
              />
            </label>
          </div>
        </div>

        <div className="md:flex">
          <div className="form-control md:w-1/2">
            <label className="label">
              <span className="label-text text-white">Blood Group</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                name="group"
                placeholder="Blood Group"
                className="input input-bordered w-full"
              />
            </label>
          </div>
          <div className="form-control md:w-1/2 ml-2 md:ml-4">
            <label className="label">
              <span className="label-text text-white">Phone</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                className="input input-bordered w-full"
              />
            </label>
          </div>
        </div>

        <div className="md:flex">
          <div className="form-control md:w-1/2">
            <label className="label">
              <span className="label-text text-white">Gender</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                name="gender"
                placeholder="Gender"
                className="input input-bordered w-full"
              />
            </label>
          </div>
          <div className="form-control md:w-1/2 ml-2 md:ml-4">
            <label className="label">
              <span className="label-text text-white">Address</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                name="address"
                placeholder="Address"
                className="input input-bordered w-full"
              />
            </label>
          </div>
        </div>

        <div className="form-control md:w-full">
          <label className="label">
            <span className="label-text text-white">Photo URL</span>
          </label>
          <label className="input-group">
            <input
              type="text"
              name="photo"
              placeholder="Photo URL"
              className="input input-bordered w-full"
            />
          </label>
        </div>
        <input
          type="submit"
          value="Add Donor"
          className="btn btn-block mt-4 bg-gradient-to-r from-cyan-800  to-cyan-500 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-800 text-xl  px-4 py-2 rounded-md text-white"
        />
      </form>

    
      <div className="mt-48">
      <h1 className="text-3xl text-center mb-4 md:mb-8 font-bold text-white ">
        Patient Details
      </h1>
      <form onSubmit={handleAddPatient} ref={formRef}>
        <div className="lg:flex flex-row">
          <div className="form-control md:w-1/2">
            <label className="label">
              <span className="label-text text-white">Donor Name</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                name="name"
                placeholder="Donor Name"
                className="input input-bordered w-full"
              />
            </label>
          </div>

          <div className="form-control md:w-1/2 ml-2 md:ml-4">
            <label className="label">
              <span className="label-text text-white">Age</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                name="age"
                placeholder="Age"
                className="input input-bordered w-full"
              />
            </label>
          </div>
        </div>

        <div className="md:flex">
          <div className="form-control md:w-1/2">
            <label className="label">
              <span className="label-text text-white">Blood Group</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                name="group"
                placeholder="Blood Group"
                className="input input-bordered w-full"
              />
            </label>
          </div>
          <div className="form-control md:w-1/2 ml-2 md:ml-4">
            <label className="label">
              <span className="label-text text-white">Phone</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                className="input input-bordered w-full"
              />
            </label>
          </div>
        </div>

        <div className="md:flex">
          <div className="form-control md:w-1/2">
            <label className="label">
              <span className="label-text text-white">Gender</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                name="gender"
                placeholder="Gender"
                className="input input-bordered w-full"
              />
            </label>
          </div>
          <div className="form-control md:w-1/2 ml-2 md:ml-4">
            <label className="label">
              <span className="label-text text-white">Address</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                name="address"
                placeholder="Address"
                className="input input-bordered w-full"
              />
            </label>
          </div>
        </div>

        <div className="form-control md:w-full">
          <label className="label">
            <span className="label-text text-white">Photo URL</span>
          </label>
          <label className="input-group">
            <input
              type="text"
              name="photo"
              placeholder="Photo URL"
              className="input input-bordered w-full"
            />
          </label>
        </div>
        <input
          type="submit"
          value="Add Patient"
          className="btn btn-block mt-4 bg-gradient-to-r from-cyan-800  to-cyan-500 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-800 text-xl  px-4 py-2 rounded-md text-white"
        />
      </form>
      </div>
       

    </div>


    



  );
  
};

export default Admin;

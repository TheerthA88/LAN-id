import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./termLap.css";
import "../global.css";
import axios from "axios";
import { termLapSchema } from "../../validation/UserValidation";

const Termination_LaptopRetrieval = () => {
  const form = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(termLapSchema) });
  const [termLapData, setTermLapData] = useState({
    employeeID: "",
    lanID: "",
    supervisorEmail: "",
    dateOfLeaving: "",
    dropLocation: "",
    spocEmail: "",
    spocPhone: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    return setTermLapData({
      ...termLapData,
      [name]: value,
    });
  };

  const onSubmitHandler = async (data, e) => {
    reset();
    try {
      await axios.post("http://localhost:3001/termLap-form", { data });
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Form submission failed.");
    }
    setTimeout(() => {
      alert("data sent");
    }, 1000);
  };

  return (
    <>
      <div style={{ background: "lightblue" }} className="p-1">
        <h2 className="mt-3">Termination and Laptop Retrieval</h2>
      </div>
      <form ref={form} onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="mt-5 termLap-grid">
          <div className="termLap-item">
            <label>Employee ID</label>
            <input
              {...register("employeeID")}
              name="employeeID"
              type="text"
              placeholder="Employee ID"
              value={termLapData.employeeID}
              onChange={handleInputChange}
            />
            <div className="error">{errors.employeeID?.message}</div>
          </div>
          <div className="termLap-item">
            <label>LAN ID</label>
            <input
              {...register("lanID")}
              name="lanID"
              placeholder="LAN ID"
              type="text"
              value={termLapData.lanID}
              onChange={handleInputChange}
            />
            <div className="error">{errors.lanID?.message}</div>
          </div>
          <div className="termLap-item">
            <label>Supervisor Email</label>
            <input
              {...register("supervisorEmail")}
              name="supervisorEmail"
              placeholder="Supervisor Email"
              type="text"
              value={termLapData.supervisorEmail}
              onChange={handleInputChange}
            />
            <div className="error">{errors.supervisorEmail?.message}</div>
          </div>
          <div className="termLap-item">
            <label>Date of Leaving</label>
            <input
              {...register("dateOfLeaving")}
              name="dateOfLeaving"
              type="date"
              value={termLapData.dateOfLeaving}
              onChange={handleInputChange}
            />
            <div className="error">{errors.dateOfLeaving?.message}</div>
          </div>
          <div className="termLap-item">
            <label>Drop off location (Brampton or Toronto)</label>
            <input
              {...register("dropLocation")}
              name="dropLocation"
              placeholder="Drop-off Location"
              type="text"
              value={termLapData.dropLocation}
              onChange={handleInputChange}
            />
            <div className="error">{errors.dropLocation?.message}</div>
          </div>
          <div className="termLap-item">
            <label>SPOC Personal Email Address </label>
            <input
              {...register("spocEmail")}
              name="spocEmail"
              type="email"
              placeholder="SPOC Email address"
              value={termLapData.spocEmail}
              onChange={handleInputChange}
            />
            <div className="error">{errors.spocEmail?.message}</div>
          </div>
          <div className="termLap-item">
            <label>SPOC Personal Phone Number</label>
            <input
              {...register("spocPhone")}
              name="spocPhone"
              type="text"
              placeholder="SPOC Phone Number"
              value={termLapData.spocPhone}
              onChange={handleInputChange}
            />
            <div className="error">{errors.spocPhone?.message}</div>
          </div>
        </div>
        <button
          className="px-4 py-2 mt-4  text-white bg-primary rounded border border-transparent"
          type="submit"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default Termination_LaptopRetrieval;

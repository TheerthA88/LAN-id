import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "../global.css";
import { terminationSchema } from "../../validation/UserValidation";
import axios from "axios";
import FetchTerminationData from "./FetchTerminationData";
const Termination = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(terminationSchema) });
  const [terminationData, setTermintionData] = useState({
    employeeID: "",
    lanID: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setTermintionData({
      ...terminationData,
      [name]: value,
    });
  };

  const onSubmitHandler = async (data, e) => {
    e.preventDefault();
    console.log({ data });
    reset();

    try {
      await axios.post("http://localhost:3001/submit-form", { data });
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Form submission failed.");
    }

    // setTimeout(() => {
    //   alert("data sent");
    // }, 200);
  };

  return (
    <>
      <div style={{ background: "lightblue" }} className="p-1">
        <h2 className="mt-3">LAN ID Termination</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="term_container">
          <div className="item mt-4">
            <label>Employee ID</label>
            <input
              {...register("employeeID")}
              type="text"
              name="employeeID"
              placeholder="Employee ID"
              // value={terminationData.employeeID}
              onChange={handleInputChange}
            />
            <div className="error">{errors.employeeID?.message}</div>
          </div>
          <div className="item">
            <label>LAN ID</label>
            <input
              {...register("lanID")}
              type="text"
              name="lanID"
              placeholder="LAN ID"
              // value={terminationData.lanID}
              onChange={handleInputChange}
            />
            <div className="error">{errors.lanID?.message}</div>
          </div>
          <button
            className="px-4 py-2 mt-4 text-white bg-primary rounded border border-light"
            type="submit"
            onClick={() => reset}
          >
            Submit
          </button>
        </div>
        {false && <FetchTerminationData data={terminationData} />}
      </form>
    </>
  );
};

export default Termination;

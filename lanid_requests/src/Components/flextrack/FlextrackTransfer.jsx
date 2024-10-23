import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { transferSchema } from "../../validation/UserValidation";
// import "./track.css";
import axios from "axios";
import "../global.css";

const FlextrackTransfer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(transferSchema) });
  const [tranferData, setTransferData] = useState({
    employeeID: "",
    lanID: "",
    transferFrom: "",
    transferTo: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransferData({
      ...tranferData,
      [name]: value,
    });
  };

  const onSubmitHandler = async (data, e) => {
    e.preventDefault();
    console.log({ data });
    reset();
    try {
      await axios.post("http://localhost:3001/transfer-form", { data });
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
        <h2 className="mt-3">Transfer Request</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="mt-4">
          <div className="item">
            <label>Employee ID</label>
            <input
              {...register("employeeID")}
              name="employeeID"
              placeholder="Employee ID"
              type="text"
              // value={tranferData.employeeID}
              onChange={handleInputChange}
            />
            <div className="error">{errors.employeeID?.message}</div>
          </div>
          <div className="item">
            <label>LAN ID</label>
            <input
              {...register("lanID")}
              name="lanID"
              placeholder="LAN ID"
              type="text"
              // value={tranferData.lanID}
              onChange={handleInputChange}
            />
            <div className="error">{errors.lanID?.message}</div>
          </div>
          <div className="item">
            <label>Transfer From</label>
            <input
              {...register("transferFrom")}
              name="transferFrom"
              placeholder="Transfer From Mail ID"
              type="email"
              // value={tranferData.transferFrom}
              onChange={handleInputChange}
            />
            <div className="error">{errors.transferFrom?.message}</div>
          </div>
          <div className="item">
            <label>Transfer To</label>
            <input
              {...register("transferTo")}
              name="transferTo"
              placeholder="Transfer To Mail ID"
              type="email"
              // value={tranferData.transferTo}
              onChange={handleInputChange}
            />
            <div className="error">{errors.transferTo?.message}</div>
          </div>
          <button
            className="px-4 py-2 mt-4 text-white bg-primary rounded border border-light"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};
export default FlextrackTransfer;

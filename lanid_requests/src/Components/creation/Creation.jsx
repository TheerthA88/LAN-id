import { useState, useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import "./creation.css";
import "../global.css";
import { createSchema } from "../../validation/UserValidation";
import FetchCreationData from "./FetchCreationData";

function Creation() {
  const {
    register,
    handleSubmit,
    control,
    unregister,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(createSchema) });
  const [show, setShow] = useState(true);
  const [showPostal, setShowPostal] = useState(false);
  const [showIndia, setShowIndia] = useState(true);
  const [showOffshore, setShowOffshore] = useState(true);
  const [role, setRole] = useState([]);
  const [city, setCity] = useState([]);
  const [location, setLocation] = useState([]);
  const [rates, setRates] = useState([]);
  const [b, setBU] = useState([]);

  const [createData, setCreateData] = useState({
    firstname: "",
    lastname: "",
    bu: "",
    rogersRole: "",
    location: "",
    city: "",
    hourlyRate: "",
    dob: "",
    otl: "",
    countryCode: "",
    phone: "",
    email: "",
    postalcode: "",
    reason: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCreateData({
      ...createData,
      [name]: value,
    });
  };

  // Handle form submission
  const onSubmitHandler = async (data, e) => {
    e.preventDefault();
    console.log({ data }, (data.phone = data.countryCode + " " + data.phone));
    setCreateData(data);
    setShow(true);
    try {
      await axios.post("http://localhost:3001/submit-form", {
        data,
        showPostal,
      });
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Form submission failed.");
    }
    // setShowOffshore(!showOffshore);
    reset();
    setTimeout(() => {
      alert("data sent");
    }, 100);
  };

  useMemo(() => {
    createData.location === "" && unregister("location");
    createData.city === "" && unregister("city");
    createData.hourlyRate === "" && unregister("hourlyRate");
  }, [createData.rogersRole]);

  // useMemo(() => {
  //   createData.city === "" && unregister("city");
  //   createData.hourlyRate === "" && unregister("hourlyRate");
  // }, [createData.location]);

  // useMemo(() => {
  //   createData.hourlyRate === "" && unregister("hourlyRate");
  // }, [createData.city]);

  useEffect(() => {
    axios.get("/api/Values/").then((res) => {
      console.log(res.data);
      console.log(res.data.role);
      const filterRoles = res.data.role.filter(
        (role) => role.role !== "DIRECTOR" && role.role !== "QA SR MANAGER"
      );
      console.log(filterRoles);
      setRole(filterRoles);
      const filterBU = res.data.bu.filter(
        (bu) =>
          bu.bU_Name !== "DevOps" &&
          bu.bU_Name !== "Corporate - West ERP Cloud" &&
          bu.bU_Name !== "Corporate - ERP Cloud" &&
          bu.bU_Name !== "TBD" &&
          bu.bU_Name !== "Media"
      );
      console.log(filterBU);
      setBU(filterBU);
    });
  }, []);

  const mapped = location.map((loc, index) => loc.location);
  const filtered = mapped.filter(
    (data, index) => mapped.indexOf(data) === index
  );

  const handleRole = (e) => {
    setCreateData({
      ...createData,
      rogersRole: e.target.value,
      location: "",
      city: "",
      hourlyRate: "",
    });

    if (e.target.value === "") {
      alert("Please Enter Rogers Role");
      // setShow(true);
    }
    // else if (
    //   e.target.value === "DIRECTOR" ||
    //   e.target.value === "QA SR MANAGER"
    // ) {
    //   // setLocation([]);
    //   // setCity([]);
    //   // setRates([]);
    //   setShow(false);
    // }
    else {
      // setShow(true);
      setCity([]);
      setRates([]);
      setLocation(
        role.find((role) => role.role === e.target.value).locationRateList
      );
    }
  };

  const handleLocation = (e) => {
    setCreateData({
      ...createData,
      location: e.target.value,
      city: "",
      hourlyRate: "",
    });
    if (e.target.value === "") {
      alert("Please Enter Location");
      setShowPostal(false);
    } else if (e.target.value === "Onsite") {
      unregister("countryCode");
      setShowIndia(false);
      setCity(location.filter((c) => c.location === e.target.value));
      setShowPostal(true);
    } else {
      unregister("countryCode");
      setShowIndia(true);
      setShowPostal(false);
      setRates([]);
      setCity(location.filter((c) => c.location === e.target.value));
    }
  };

  const handleCity = (e) => {
    setCreateData({ ...createData, city: e.target.value, hourlyRate: "" });
    if (e.target.value === "") {
      alert("Please Enter City");
    } else {
      setRates(location.find((city) => city.city === e.target.value).rate);
    }
  };

  return (
    <>
      {/* {showOffshore && ( */}
      <div style={{ background: "lightblue" }} className="p-1">
        <h2 className="mt-3">LAN ID Creation</h2>
      </div>
      {/* )} */}
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        {/* {showOffshore ? ( */}
        <div className="grid-container mt-3">
          <div className="grid-item">
            <label>First name</label>
            <input
              className="input-type1"
              {...register("firstname")}
              name="firstname"
              placeholder="First name"
              type="text"
              onChange={handleInputChange}
            />
            <div className="error">{errors.firstname?.message}</div>
          </div>
          <div className="grid-item">
            <label>Last name</label>
            <input
              className="input-type1"
              {...register("lastname")}
              name="lastname"
              placeholder="Last name"
              type="text"
              onChange={handleInputChange}
            />
            <div className="error">{errors.lastname?.message}</div>
          </div>
          <div className="grid-item">
            <label>BU</label>
            <div className="dropdown">
              <select {...register("bu")} onChange={handleInputChange}>
                <option value="">Select...</option>
                {b.map((bu) => (
                  <option key={bu.id} value={bu.bU_Name}>
                    {bu.bU_Name}
                  </option>
                ))}
              </select>
            </div>
            <div className="error">{errors.bu?.message}</div>
          </div>
          <div className="grid-item">
            <label>Rogers Role</label>
            <div className="dropdown">
              <select {...register("rogersRole")} onChange={handleRole}>
                <option value="">Select...</option>
                {role.map((r) => (
                  <option key={r.id} value={r.role}>
                    {r.role}
                  </option>
                ))}
              </select>
            </div>
            <div className="error">{errors.rogersRole?.message}</div>
          </div>

          <div className="grid-item">
            <label>Location</label>
            {/* {show ? ( */}
            <div className="dropdown">
              <select
                {...register("location")}
                value={createData.location}
                onChange={handleLocation}
              >
                <option value="">--Select--</option>
                {filtered.map((loc, index) => (
                  <option key={index} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
            {/* // ) : (
              //   <input
              //     style={{
              //       background: "#d3d3d3",
              //       border: "none",
              //       outline: "none",
              //     }}
              //     onFocus={(e) => (e.target.style.borderColor = "none")}
              //     value="NA"
              //     className="input-type1"
              //     readOnly
              //     {...register("location")}
              //   />
              // )} */}
            <div className="error">{errors.location?.message}</div>
          </div>

          <div className="grid-item">
            <label>City</label>

            {/* {show ? ( */}
            <div className="dropdown">
              <select
                {...register("city")}
                value={createData.city}
                onChange={handleCity}
              >
                <option value="">--Select--</option>
                {city.map((loc, index) => (
                  <option key={index} value={loc.city}>
                    {loc.city}
                  </option>
                ))}
              </select>
            </div>
            {/* ) : (
              <input
                style={{
                  border: "none",
                  background: "#d3d3d3",
                  outline: "none",
                }}
                onFocus={(e) => (e.target.style.borderColor = "none")}
                value="NA"
                className="input-type1"
                readOnly
                {...register("city")}
              />
            )} */}
            <div className="error">{errors.city?.message}</div>
          </div>
          <div className="grid-item">
            <label>Hourly Rate</label>
            {/* {show ? ( */}
            <div className="dropdown">
              <select
                {...register("hourlyRate")}
                value={createData.hourlyRate}
                onChange={handleInputChange}
              >
                <option value="">--Select--</option>
                {rates.map((rate, index) => (
                  <option key={index}>{rate}</option>
                ))}
              </select>
            </div>
            {/* ) : (
              <input
                style={{
                  border: "none",
                  background: "#d3d3d3",
                  outline: "none",
                }}
                onFocus={(e) => (e.target.style.borderColor = "none")}
                value="NA"
                className="input-type1"
                readOnly
                {...register("hourlyRate")}
              />
            )} */}
            <div className="error">{errors.hourlyRate?.message}</div>
          </div>
          <div className="grid-item">
            <label>DOB</label>
            <input
              className="input-type1"
              {...register("dob")}
              name="dob"
              placeholder="MM-DD-YYYY"
              type="date"
              max={new Date().toISOString().split("T")[0]}
              onChange={handleInputChange}
            />
            <div className="error">{errors.dob?.message}</div>
          </div>
          <div className="grid-item">
            <label>Need OTL</label>
            <div className="dropdown">
              <select {...register("otl")} onChange={handleInputChange}>
                <option value="">--Select--</option>
                <option value="yes">Yes</option>
                <option value="yes">No</option>
              </select>
            </div>
            <div className="error">{errors.otl?.message}</div>
          </div>
          <div className="grid-item">
            <label>Contact number</label>
            <div className="phone">
              {showIndia ? (
                <input
                  className="country"
                  {...register("countryCode")}
                  value="+91"
                  readOnly
                />
              ) : (
                <input
                  className="country"
                  {...register("countryCode")}
                  value="+1"
                  readOnly
                />
              )}

              {/* <select {...register("countryCode")} onChange={handleInputChange}>
                <option value="+91">+91</option>
                <option value="+1">+1</option>
              </select> */}

              <input
                name="phone"
                className="phoneN"
                type="string"
                {...register("phone")}
                onChange={handleInputChange}
              />
            </div>
            <div className="error">{errors.phone?.message}</div>
          </div>
          {!showPostal ? (
            <div className="grid-item">
              <label>TechM Email ID</label>
              <input
                className="input-type1"
                {...register("email")}
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleInputChange}
              />
              <div className="error">{errors.email?.message}</div>
            </div>
          ) : (
            <div className="grid-item">
              <label>Postal Code</label>
              <input
                className="input-type1"
                {...register("postalcode")}
                type="postalcode"
                name="postalcode"
                placeholder="Postal Code"
                onChange={handleInputChange}
              />
              <div className="error">{errors.postalcode?.message}</div>
            </div>
          )}
          <div className="grid-item">
            <label>Reason</label>
            <textarea
              {...register("reason")}
              name="reason"
              placeholder="Enter the reason in detail..."
              onChange={handleInputChange}
            />
            <div className="error">{errors.reason?.message}</div>
          </div>
        </div>
        {/* ) : (
          <FetchCreationData showPostal={showPostal} data={createData} />
        )} */}
        <button
          className="px-4 py-1 text-white bg-primary rounded border border-light"
          type="submit"
        >
          Submit
        </button>
      </form>
    </>
  );
}

export default Creation;

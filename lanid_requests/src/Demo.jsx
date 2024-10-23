import { Controller, useForm } from "react-hook-form";
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
const Demo = () => {
  // const url = 'http://qatools.rogers.com:6100/api/Values';

  const [userData, setUserData] = useState({
    r: "",
    loc: "",
    c: "",
    rate: "",
  });

  const schema = yup.object().shape({
    r: yup.string().required("Please enter role"),
    loc: yup.string().required("Please enter location"),
    c: yup.string().required("Please enter city"),
    rate: yup.string().required("Please enter rate"),
  });
  const [show, setShow] = useState(true);
  const [city, setCity] = useState([]);
  const [role, setRole] = useState([]);
  const [bu, setBu] = useState([]);
  const [location, setLocation] = useState([]);
  const [rates, setRates] = useState([]);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    unregister,
  } = useForm({ resolver: yupResolver(schema) });
  // const {locationRateList: {rate}} = role;
  const handleFetch = (data) => {
    console.log(data);
    reset();
    setUserData({
      ...userData,
      loc: "",
      r: "",
    });
  };

  // console.log(userData);

  useMemo(() => {
    userData.loc === "" && unregister("loc");
    userData.c === "" && unregister("c");
    userData.rate === "" && unregister("rate");
  }, [userData.r]);

  useMemo(() => {
    userData.c === "" && unregister("c");
    userData.rate === "" && unregister("rate");
  }, [userData.loc]);

  useMemo(() => {
    userData.rate === "" && unregister("rate");
  }, [userData.c]);

  useEffect(() => {
    axios.get("api/Values").then((res) => {
      console.log(res.data);
      const filterRoles = res.data.role.filter(
        (role) => role.role !== "DIRECTOR" && role.role !== "QA SR MANAGER"
      );
      console.log(filterRoles);
      setRole(filterRoles);
      const filterBU = res.data.bu.filter(
        (bu) =>
          bu.bU_Name !== "Automation" &&
          bu.bU_Name !== "BENCH" &&
          bu.bU_Name !== "CSV" &&
          bu.bU_Name !== "Channels" &&
          bu.bU_Name !== "CoE/TRM/Tools/GOV" &&
          bu.bU_Name !== "Connected Home" &&
          bu.bU_Name !== "Connected Home - Channels" &&
          bu.bU_Name !== "Corporate - IFRS" &&
          bu.bU_Name !== "Corporate – FinSys (eBiz)" &&
          bu.bU_Name !== "Corporate – HRS" &&
          bu.bU_Name !== "Corporate-DealerCom" &&
          bu.bU_Name !== "ED&A" &&
          bu.bU_Name !== "IT Services/Prod Support" &&
          bu.bU_Name !== "PDP" &&
          bu.bU_Name !== "Performance" &&
          bu.bU_Name !== "RB" &&
          bu.bU_Name !== "RPA" &&
          bu.bU_Name !== "Regression" &&
          bu.bU_Name !== "SRE" &&
          bu.bU_Name !== "Wireless"
      );
      setBu(filterBU);
      // console.log(filterBU);
      // console.log({filterBU});
      setLocation([1]);
    });
  }, []);

  const mapped = location.map((loc, index) => loc.location);
  const filtered = mapped.filter(
    (data, index) => mapped.indexOf(data) === index
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleRole = (e) => {
    setUserData({
      ...userData,
      r: e.target.value,
      loc: "",
      c: "",
      rate: "",
    });

    if (e.target.value === "") {
      // setShow(true);
      alert("Please enter Role to proceed");
    } else {
      // setShow(true);
      setCity([]);
      setRates([]);
      setLocation(
        role.find((role) => role.role === e.target.value).locationRateList
      );
    }
  };

  const handleLocation = (e) => {
    setUserData({
      ...userData,
      loc: e.target.value,
      c: "",
      rate: "",
    });
    if (e.target.value === "") {
      alert("Please enter Location to proceed");
    } else {
      setRates([]);
      setCity(location.filter((c) => c.location === e.target.value));
    }
  };

  const handleCity = (e) => {
    setUserData({
      ...userData,
      c: e.target.value,
      rate: "",
    });
    if (e.target.value === "") {
      alert("Please enter City to proceed");
    } else {
      setRates(location.find((city) => city.city === e.target.value).rate);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFetch)}>
      <div>
        <div>
          <div>
            <select {...register("r")} value={userData.r} onChange={handleRole}>
              <option value="">--Select--</option>
              {role.map((role) => (
                <option value={role.role} key={role.id}>
                  {role.role}
                </option>
              ))}
            </select>
            <div className="error">{errors.r?.message}</div>
          </div>
        </div>
        <div>
          {/* {show ? ( */}
          <div>
            <select
              {...register("loc")}
              value={userData.loc}
              onChange={handleLocation}
            >
              <option value="">--Selected--</option>

              {filtered.map((loc, index) => (
                <option key={index} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
            {<div className="error">{errors.loc?.message}</div>}
          </div>
        </div>
        <div>
          {/* {show ? ( */}
          <div>
            <select {...register("c")} onChange={handleCity}>
              <option value="">--Selected--</option>
              {city.map((city, index) => (
                <option key={index} value={city.city}>
                  {city.city}
                </option>
              ))}
            </select>
            <div className="error">{errors.c?.message}</div>
          </div>
          {/* ) : (
            <div>
              <input {...register("c")} readOnly value="NA" />
            </div>
          )} */}
        </div>
        <div>
          {/* {show ? ( */}
          <div>
            <select onChange={handleInputChange} {...register("rate")}>
              <option value="">--Selected--</option>

              {rates.map((loc, index) => (
                <option key={index} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
            <div className="error">{errors.rate?.message}</div>
          </div>
          {/* ) : (
            <div>
              <input {...register("rate")} readOnly value="NA" />
            </div>
          )} */}
        </div>
        <button type="submit">Fetch</button>
        {bu.map((bu) => (
          <p>{bu.bU_Name}</p>
        ))}
      </div>
    </form>
  );
};

// setRole(res.data.role)
export default Demo;

import React from "react";
import { Route, Routes } from "react-router";
import Creation from "./creation/Creation";
import Termination from "./termination/Termination";
import FlextrackTransfer from "./flextrack/FlextrackTransfer";
import Termination_LaptopRetrieval from "./termination_laptop/Termination_LaptopRetrieval";
import Requests from "./Requests";

const Home = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Requests />} />
        <Route path="/create_request" element={<Creation />} />
        <Route path="/termination_request" element={<Termination />} />
        <Route
          path="/flextrackTransfer_request"
          element={<FlextrackTransfer />}
        />
        <Route
          path="/termination_laptopRetrieval_request"
          element={<Termination_LaptopRetrieval />}
        />
      </Routes>
    </div>
  );
};

export default Home;

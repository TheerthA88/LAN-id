import React, { useState } from "react";
// const React = require("react");
// const { useState } = require("react");
const headerStyle = {
  backgroundColor: "lightblue",
  border: "1px solid #000",
  padding: "8px",
};

const cellStyle = {
  border: "1px solid #000",
  padding: "8px",
};

function FetchTermLapData({ user }) {
  //   const [fetchData, setFetchData] = useState(data);

  return (
    <div className="mt-4">
      <div
        className="mt-5 row justify-content-center"
        style={{ marginTop: 20, justifyContent: "center" }}
      >
        <p style={{ textAlign: "left" }}>Hi Example,</p>
        <p style={{ textAlign: "left" }}>
          Request you to please terminate the below LAN Id and raise a laptop
          retrieval request for the following resource as per the new process.
        </p>
        <table
          style={{
            width: "auto",
            tableLayout: "auto",
            borderCollapse: "collapse",
          }}
          className="my-table"
        >
          <thead>
            <tr>
              <th style={headerStyle}>First name</th>
              <th style={headerStyle}>Last name</th>
              <th style={headerStyle}>Date of Leaving</th>
              <th style={headerStyle}>Drop Off Location</th>
              <th style={headerStyle}>SPOC Email</th>
              <th style={headerStyle}>SPOC Phone</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={cellStyle}>{user.employeeID}</td>
              <td style={cellStyle}>{user.lanID}</td>
              <td style={cellStyle}>{user.dateOfLeaving}</td>
              <td style={cellStyle}>{user.dropLocation}</td>
              <td style={cellStyle}>{user.spocEmail}</td>
              <td style={cellStyle}>{user.spocPhone}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FetchTermLapData;

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

function FetchTerminationData({ data }) {
  //   const [fetchData, setFetchData] = useState(data);

  return (
    <div className="mt-4">
      <div
        className="mt-5 row justify-content-center"
        style={{ marginTop: 20, justifyContent: "center" }}
      >
        <p style={{ textAlign: "left" }}>Hi Example,</p>
        <p style={{ textAlign: "left" }}>
          Request you to please terminate the below LAN ID.
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
              <th style={headerStyle}>Employee ID</th>
              <th style={headerStyle}>Lan ID</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={cellStyle}>{data.employeeID}</td>
              <td style={cellStyle}>{data.lanID}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FetchTerminationData;

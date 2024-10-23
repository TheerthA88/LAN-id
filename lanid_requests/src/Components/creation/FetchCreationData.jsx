import React, { useState } from "react";

const FetchCreationData = ({ data, showPostal }) => {
  const [fetchData, setFetchData] = useState(data);

  const headerStyle = {
    backgroundColor: "lightblue",
    border: "1px solid #000",
    padding: "8px",
  };

  const cellStyle = {
    border: "1px solid #000",
    padding: "8px",
  };

  return (
    <div className="mt-4">
      <div className="mt-5 row justify-content-center">
        <p style={{ textAlign: "left" }}>Hi {data.firstname},</p>
        <p style={{ textAlign: "left" }}>
          Request you to please submit the below name for LAN ID creation.
          Kindly include Contact # of new resource as this is mandatory for MFA
          set up.
        </p>
        <table
          style={{
            width: "95%",
            tableLayout: "auto",
            borderCollapse: "collapse",
          }}
        >
          <thead className="table-primary">
            <tr>
              <th style={headerStyle}>First name</th>
              <th style={headerStyle}>Last name</th>
              <th style={headerStyle}>Rogers Role</th>
              <th style={headerStyle}>BU</th>
              <th style={headerStyle}>Location</th>
              <th style={headerStyle}>City</th>
              <th style={headerStyle}>DOB</th>
              <th style={headerStyle}>Hourly Rate</th>
              <th style={headerStyle}>Needs OTL</th>
              <th style={headerStyle}>Contact number</th>
              {!showPostal ? (
                <th style={headerStyle}>TechM Email ID</th>
              ) : (
                <th style={headerStyle}>Postal Code</th>
              )}
              <th style={headerStyle}>Reason</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={cellStyle}>{data.firstname}</td>
              <td style={cellStyle}>{data.lastname}</td>
              <td style={cellStyle}>{data.rogersRole}</td>
              <td style={cellStyle}>{data.bu}</td>
              <td style={cellStyle}>{data.location}</td>
              <td style={cellStyle}>{data.city}</td>
              <td style={cellStyle}>{data.dob}</td>
              <td style={cellStyle}>{data.hourlyRate}</td>
              <td style={cellStyle}>{data.otl}</td>
              <td style={cellStyle}>{data.phone}</td>
              {!showPostal ? (
                <td style={cellStyle}>{data.email}</td>
              ) : (
                <td style={cellStyle}>{data.postalcode}</td>
              )}
              <td style={cellStyle}>{data.reason}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FetchCreationData;

import React from "react";
import { Link } from "react-router-dom";
import "./requests.css";

const Requests = () => {
  return (
    <>
      <h2 className="mt-4 text-danger right">Request Form </h2>
      <div className="container">
        <div className="image-container">
          <img src="create.jpg" alt="Create Request" width={300} height={200} />
          <div className="text-overlay">
            <div className="text">
              <Link to="/create_request">Create Request</Link>
            </div>
          </div>
        </div>
        <div className="image-container">
          <img
            src="termination.jpg"
            alt="Termination Request"
            width={300}
            height={200}
          />
          <div className="text-overlay">
            <div className="text">
              <Link to="/termination_request">
                Termination Request
                <div className="site">(Offshore)</div>
              </Link>
            </div>
          </div>
        </div>
        <div className="image-container">
          <img src="transfer.jpg" alt="Flextransfer" width={300} height={200} />
          <div className="text-overlay">
            <div className="text">
              <Link to="/flextrackTransfer_request">Flextrack Transfer</Link>
            </div>
          </div>
        </div>
        <div className="image-container">
          <img
            src="retreival.jpg"
            alt="Termination and Laptop Retreival"
            width={300}
            height={200}
          />
          <div className="text-overlay">
            <div></div>
            <div className="text">
              <Link to="/termination_laptopRetrieval_request">
                Termination and Laptop Retreiveal
                <div className="site">(Onsite)</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Requests;

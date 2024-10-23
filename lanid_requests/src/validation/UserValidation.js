import React from "react";
import * as yup from "yup";
// import { useForm } from "react-hook-form";

export const terminationSchema = yup.object().shape({
  employeeID: yup.string().required("Employee ID is required"),
  lanID: yup.string().required("Please Enter Lan ID"),
});

export const createSchema = yup.object().shape({
  firstname: yup.string().required("Please Enter First Name"),
  lastname: yup.string().required("Please Enter Last Name"),
  rogersRole: yup.string().required("Please Enter Rogers Role"),
  bu: yup.string().required("Please Enter Business Unit"),
  location: yup.string().required("Please Enter Location"),

  city: yup.string().required("Please Enter City"),
  hourlyRate: yup.string().required("Please Enter Hourly Rate"),
  dob: yup.string().required("Please Enter DOB"),
  otl: yup.string().required("Please Enter OTL"),
  phone: yup
    .string()
    .matches(/^\d{10}$/, "Enter 10 Digit valid Phone Number")
    .required("Please Enter Phone number "),
  email: yup.string().when("location", {
    is: "Onsite",
    then: () => yup.string().notRequired(),
    otherwise: () =>
      yup
        .string()

        .required("Please Enter Email")
        .matches(
          /^[a-zA-Z0-9._%+-]+@techmahindra\.com$/i,
          "Please Enter in format techmahindra.com"
        ),
  }),
  postalcode: yup.string().when("location", {
    is: "Onsite",
    then: () =>
      yup
        .string()
        .max(6)
        .matches(
          /^[A-Za-z][0-9][A-Za-z][0-9][A-Za-z][0-9]$/,
          "Please Enter in format A1B2C3"
        )
        .required("Please enter postalcode"),
    otherwise: () => yup.string().notRequired(),
  }),
  reason: yup.string().required("Please Enter Reason"),
});

export const transferSchema = yup.object().shape({
  employeeID: yup.string().required("Please Enter Employee ID"),
  lanID: yup.string().required("Please Enter Lan ID"),
  transferFrom: yup
    .string()
    .required("Please Enter Transfer To")
    .matches(
      /^[a-zA-Z0-9._%+-]+@rci\.rogers\.com$/i,
      "Please enter rci.rogers.com"
    ),
  transferTo: yup
    .string()
    .required("Please Enter Transfer To")
    .matches(
      /^[a-zA-Z0-9._%+-]+@rci\.rogers\.com$/i,
      "Please enter rci.rogers.com"
    ),
});

export const termLapSchema = yup.object().shape({
  employeeID: yup.string().required("Please Enter Employee ID"),
  lanID: yup.string().required("Please Enter Lan ID"),
  supervisorEmail: yup.string().required("Please Enter Supervisor Email"),
  dateOfLeaving: yup.string().required("Please Enter Date of Leaving"),
  dropLocation: yup.string().required("Please Enter Drop Location"),
  spocEmail: yup.string().required("Please Enter SPOC Email address"),
  spocPhone: yup
    .string()
    .required("Please Enter Phone number ")
    .matches(/^\d{10}$/, "Enter 10 Digit valid Phone Number"),
});

import Input from "components/registration/Input";
import { Formik } from "formik";
import Notiflix from "notiflix";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

const PatientRegistration = () => {
  const navigate = useNavigate();

  const registerSchema = Yup.object().shape({
    postalCode: Yup.string()
      .matches(/^([A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d)$/, "Invalid postal code")
      .required("Postal code is required"),
    password: Yup.string()
      .required("Please enter a password")
      .min(8, "Your password should be a minimum of 8 characters")
      .matches(
        /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/,
        "Password must contain at least one uppercase character and one special character"
      ),
    confirmPassword: Yup.string()
      .required("Please re-enter your password")
      .oneOf([Yup.ref("password"), null], "The passwords entered don't match"),
    phoneNumber: Yup.string()
      .required("Phone number is missing")
      .matches(
        /^(\d{3})[- ]?(\d{3})[- ]?(\d{4})$/,
        "Please enter a valid phone number"
      ),
  });

  const initialValues = {
    firstName: useSelector((state) => state.register.firstName),
    lastName: useSelector((state) => state.register.lastName),
    email: useSelector((state) => state.register.email),
    userType: useSelector((state) => state.register.userType),
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    postalCode: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    const url = "http://localhost:3001/auth/patient-register";

    const body = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      postalCode: values.postalCode,
      phoneNumber: values.phoneNumber,
    };

    const savedResponse = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          Notiflix.Report.warning("Error", data.message, "Close", {
            waitForClose: true,
          });
          navigate("/");
        }
        return data;
      });
    const savedUser = await savedResponse;
    resetForm();

    if (savedUser) {
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col h-4/6 w-5/6 md:w-3/6 lg:w-2/6 mt-16 bg-formBg  rounded justify-center items-center">
      <div className="flex flex-col h-5/6 w-5/6 items-center mt-6">
        <h2 className="text-5xl ">Sign Up</h2>
        <Formik
          validationSchema={registerSchema}
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col mx-6 items-center h-5/6 mt-8 w-4/5"
            >
              <Input
                placeholder="Postal Code"
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.postalCode}
                name="postalCode"
              />
              {touched.postalCode && errors.postalCode ? (
                <div className="text-xl text-red-500">{errors.postalCode}</div>
              ) : null}
              <Input
                placeholder="Password"
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.password}
                name="password"
              />
              {touched.password && errors.password ? (
                <div className="text-xl text-red-500">{errors.password}</div>
              ) : null}
              <Input
                placeholder="Confirm Password"
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.confirmPassword}
                name="confirmPassword"
              />
              {touched.confirmPassword && errors.confirmPassword ? (
                <div className="text-xl text-red-500">
                  {errors.confirmPassword}
                </div>
              ) : null}
              <Input
                placeholder="Phone Number"
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.phoneNumber}
                name="phoneNumber"
              />
              {touched.phoneNumber && errors.phoneNumber ? (
                <div className="text-xl text-red-500">{errors.phoneNumber}</div>
              ) : null}
              <button
                type="submit"
                className="w-8/12 h-10 rounded-2xl drop-shadow-md bg-buttonBg mt-10"
              >
                Sign Up
              </button>
              <div className="flex flex-row mt-6">
                <h4 className="mr-2">Already a member?</h4>
                <Link to="/" className="text-indigo-400">
                  Login
                </Link>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default PatientRegistration;

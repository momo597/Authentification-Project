import Input from "components/Input";
import { Formik } from "formik";
import Notiflix from "notiflix";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const ResetPassword = () => {
  const navigate = useNavigate();

  const resetSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email is a required field")
      .required("Email is a required field"),
    password: Yup.string()
      .required("Please enter a new password")
      .min(8, "Your password should be a minimum of 8 characters")
      .matches(
        /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/,
        "Password must contain at least one uppercase character and one special character"
      ),
  });

  const initialValues = {
    email: "",
    password: "",
  };
  const handlePasswordReset = async (values, { resetForm }) => {
    const url = "http://localhost:3001/auth/password-reset";

    const body = {
      email: values.email,
      password: values.password,
    };

    const savedResponse = await fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          Notiflix.Report.warning("Error", data.message, "Close", {
            waitForClose: true,
          });
        }
        return data;
      });
    const updatedUser = await savedResponse;
    resetForm();

    if (updatedUser) {
      Notiflix.Report.success("Success", "Successfully registred", "Close", {
        waitForClose: true,
      });
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col h-4/6 w-5/6 my-6 items-center justify-center">
      <Formik
        validationSchema={resetSchema}
        initialValues={initialValues}
        onSubmit={handlePasswordReset}
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
            className="flex flex-col justify-center items-center"
            onSubmit={handleSubmit}
          >
            <h2 className="sm:text-2xl ">
              Please enter the email address linked to your account:
            </h2>
            <Input
              placeholder="Enter email"
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={values.email}
              name="email"
            />
            {touched.email && errors.email ? (
              <div className="text-xl text-red-500">{errors.email}</div>
            ) : null}
            <Input
              placeholder="Enter new password"
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={values.password}
              name="password"
            />
            {touched.password && errors.password ? (
              <div className="text-xl text-red-500">{errors.password}</div>
            ) : null}
            <button
              className="w-4/6 h-8 rounded-2xl drop-shadow-md bg-inputBg mt-6"
              type="submit"
            >
              Reset Password
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPassword;

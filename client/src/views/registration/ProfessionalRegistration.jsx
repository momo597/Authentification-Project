import Input from "components/Input";
import { Formik } from "formik";
import Notiflix from "notiflix";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

const ProfessionalRegistration = () => {
  const navigate = useNavigate();

  const registerSchema = Yup.object().shape({
    id: Yup.string().required("You need an Id"),
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
    workLocation: Yup.string().required("Work location missing"),
  });

  const initialValues = {
    firstName: useSelector((state) => state.register.firstName),
    lastName: useSelector((state) => state.register.lastName),
    email: useSelector((state) => state.register.email),
    userType: useSelector((state) => state.register.userType),
    id: "",
    password: "",
    confirmPassword: "",
    workLocation: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    let url = "";

    const body = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      id: values.id,
      workLocation: values.workLocation,
      userType: values.userType,
    };

    if (values.userType === "Doctor") {
      url = "http://localhost:3001/auth/doctor-register";
    } else {
      url = "http://localhost:3001/auth/health-officer-register";
    }

    const savedResponse = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then((response) => {
      if (response.status === 201) {
        Notiflix.Report.success(
          "Success",
          "An email was sent to your account, please verify it.",
          "Close",
          {
            waitForClose: true,
          }
        );
      } else if (response.status === 500 || response.status === 400) {
        return response.json().then((data) => {
          Notiflix.Report.warning("Error", data.message, "Close", {
            waitForClose: true,
          });
          navigate("/");
        });
      }
      return response.json();
    });

    const savedUser = await savedResponse;
    resetForm();

    if (savedUser) {
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col h-4/6 w-5/6 my-10 md:w-4/6 lg:w-3/6 xl:w-2/6 bg-formBg  rounded justify-center items-center">
      <div className="flex flex-col h-full w-5/6 items-center mt-6">
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
                placeholder="Professional ID"
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.id}
                name="id"
              />
              {touched.id && errors.id ? (
                <div className="text-xl text-red-500">{errors.id}</div>
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
                placeholder="Work Location"
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.workLocation}
                name="workLocation"
              />
              {touched.workLocation && errors.workLocation ? (
                <div className="text-xl text-red-500">
                  {errors.workLocation}
                </div>
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

export default ProfessionalRegistration;

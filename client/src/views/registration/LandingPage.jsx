import LockIcon from "@mui/icons-material/Lock";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import Input from "components/Input";
import { Formik } from "formik";
import Notiflix from "notiflix";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "state/authSlice";
import { setInfo } from "state/registerSlice";
import * as Yup from "yup";

const LandingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = async (values, { resetForm }) => {
    dispatch(
      setInfo({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
      })
    );
    resetForm();
    navigate("/user-selection");
  };

  const passwordReset = () => {
    navigate("/reset-password");
  };

  const handleLogin = async (values, { resetForm }) => {
    const url = "http://localhost:3001/auth/login";

    const body = {
      email: values.email,
      password: values.password,
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
    const loggedUser = await savedResponse;
    resetForm();

    if (loggedUser) {
      dispatch(
        setLogin({
          user: loggedUser.user,
          token: loggedUser.token,
        })
      );
      navigate("/home");
    }
  };

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email is a required field")
      .required("Email is a required field"),
    password: Yup.string()
      .required("Password is a required field")
      .min(8, "Password must be at least 8 characters"),
  });

  const registerSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is a required field"),
    lastName: Yup.string().required("Last name is a required field"),
    email: Yup.string()
      .required("Email is a required field")
      .email("Invalid email format"),
    confirmEmail: Yup.string()
      .required("You need to confirm your email")
      .oneOf([Yup.ref("email"), null], "Emails must match"),
  });

  const initialValuesLogin = {
    email: "",
    password: "",
  };

  const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    confirmEmail: "",
  };

  const iconInput = (
    placeholder,
    icon,
    handleChange,
    handleBlur,
    value,
    name,
    type
  ) => (
    <div className="bg-inputBg w-5/6 h-14 rounded-md drop-shadow-lg px-6 text-2xl my-4 flex items-center">
      {icon}
      <input
        type={type}
        placeholder={placeholder}
        className="bg-transparent ml-4 w-10/12 outline-none"
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
        name={name}
      />
    </div>
  );

  const button = (value) => (
    <button
      className="w-8/12 h-10 rounded-2xl drop-shadow-md bg-buttonBg mt-10"
      type="submit"
    >
      {value}
    </button>
  );

  return (
    <div className="flex flex-col h-full w-screen items-center overflow-visible my-10 md:w-3/5 lg:flex-row ">
      <div className="bg-formBg w-5/6 h-5/6 rounded flex flex-col my-10 lg:mx-8 lg:w-1/2">
        <Formik
          validationSchema={registerSchema}
          initialValues={initialValuesRegister}
          onSubmit={handleRegister}
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
              className="flex flex-col  mx-6 items-center h-full m-10"
            >
              <h2 className="text-5xl mb-20 ">Sign Up</h2>
              <Input
                placeholder="First Name"
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.firstName}
                name="firstName"
              />
              {touched.firstName && errors.firstName ? (
                <div className="text-xl text-red-500">{errors.firstName}</div>
              ) : null}
              <Input
                placeholder="Last Name"
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.lastName}
                name="lastName"
              />
              {touched.lastName && errors.lastName ? (
                <div className="text-xl text-red-500">{errors.lastName}</div>
              ) : null}
              <Input
                placeholder="Email"
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.email}
                name="email"
              />
              {touched.email && errors.email ? (
                <div className="text-xl text-red-500">{errors.email}</div>
              ) : null}

              <Input
                placeholder="Confirm Email"
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.confirmEmail}
                name="confirmEmail"
              />
              {touched.confirmEmail && errors.confirmEmail ? (
                <div className="text-xl text-red-500">
                  {errors.confirmEmail}
                </div>
              ) : null}

              {button("Next")}
            </form>
          )}
        </Formik>
      </div>
      <div className="bg-formBg w-5/6 h-5/6 rounded flex flex-col justify-center lg:w-1/2">
        <Formik
          validationSchema={loginSchema}
          initialValues={initialValuesLogin}
          onSubmit={handleLogin}
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
              className="flex flex-col  mx-6 items-center h-full m-20"
            >
              <h2 className="text-5xl mb-24">Login</h2>
              {iconInput(
                "Email",
                <PersonOutlineIcon />,
                handleChange,
                handleBlur,
                values.email,
                "email",
                "text"
              )}
              {touched.email && errors.email ? (
                <div className="text-xl text-red-500">{errors.email}</div>
              ) : null}
              {iconInput(
                "Password",
                <LockIcon />,
                handleChange,
                handleBlur,
                values.password,
                "password",
                "password"
              )}
              {touched.password && errors.password ? (
                <div className="text-xl text-red-500">{errors.password}</div>
              ) : null}
              <div className="mt-20"></div>
              {button("Login")}
              <button
                className="w-4/6 h-8 rounded-2xl drop-shadow-md bg-inputBg mt-6 text-slate-400"
                onClick={passwordReset}
              >
                Forgot password
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LandingPage;

import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { getInfoNull } from "state/registerSlice";
import RegistrationTemplate from "templates/RegistrationTemplate";
import Home from "views/Home";
import ResetPassword from "views/ResetPassword";
import EmailConfirm from "views/registration/EmailConfirm";
import PatientRegistration from "views/registration/PatientRegistration";
import ProfessionalRegistration from "views/registration/ProfessionalRegistration";
import UserSelection from "views/registration/UserSelection";
import MainPage from "./views/registration/MainPage";

function App() {
  const isBasicNull = useSelector(getInfoNull);
  const userType = useSelector((state) => state.userType);
  const isAuth = Boolean(useSelector((state) => state.auth.token));

  return (
    <div className="min-h-screen grid text-lg">
      <BrowserRouter>
        <Routes>
          <Route element={<RegistrationTemplate />}>
            <Route exact path="/" element={<MainPage />} />
            <Route
              path="/professional-registration"
              element={
                isBasicNull && userType !== null ? (
                  <ProfessionalRegistration />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/patient-registration"
              element={
                isBasicNull && userType !== null ? (
                  <PatientRegistration />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              exact
              path="/user-selection"
              element={isBasicNull ? <UserSelection /> : <Navigate to="/" />}
            />
            <Route
              exact
              path="/home"
              element={isAuth ? <Home /> : <Navigate to="/" />}
            />
            <Route exact path="/reset-password" element={<ResetPassword />} />
            <Route exact path="/email-confirm" element={<EmailConfirm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

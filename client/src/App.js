import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { getInfoNull } from "state/registerSlice.js";
import PagesTemplate from "templates/PagesTemplate";
import Home from "views/Home";
import ResetPassword from "views/ResetPassword";
import PatientRegistration from "views/registration/PatientRegistration";
import ProfessionalRegistration from "views/registration/ProfessionalRegistration";
import UserSelection from "views/registration/UserSelection";
import LandingPage from "./views/registration/LandingPage";

function App() {
  const isBasicNull = useSelector(getInfoNull);
  const userType = useSelector((state) => state.userType);
  const isAuth = Boolean(useSelector((state) => state.auth.token));

  return (
    <div className="min-h-screen grid text-lg">
      <BrowserRouter>
        <Routes>
          <Route element={<PagesTemplate />}>
            <Route exact path="/" element={<LandingPage />} />
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
              path="/user-selection"
              element={isBasicNull ? <UserSelection /> : <Navigate to="/" />}
            />
            <Route
              path="/home"
              element={isAuth ? <Home /> : <Navigate to="/" />}
            />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import Button from "components/registration/Button";
import { Link } from "react-router-dom";

const UserSelection = () => {
  return (
    <div className="flex flex-col h-4/6 w-5/6 mt-24 bg-formBg rounded justify-center items-center mb-10 md:w-3/6 xl:w-2/6">
      <div className="flex flex-col h-5/6 w-5/6 items-center">
        <h2 className="text-3xl md:text-5xl">Sign Up</h2>
        <h3 className="text-2xl mt-16 xl:text-3xl lg:mr-80">Are you a...</h3>
        <Button name="Doctor" destination="/professional-registration" />
        <Button
          name="Health Official"
          destination="/professional-registration"
        />
        <Button name="Patient" destination="/patient-registration" />
      </div>
      <div className="flex flex-row mt-6">
        <h4 className="mr-2">Already a member?</h4>
        <Link to="/" className="text-indigo-400">
          Login
        </Link>
      </div>
    </div>
  );
};

export default UserSelection;

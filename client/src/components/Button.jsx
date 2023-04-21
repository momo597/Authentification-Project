import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserType } from "state/registerSlice";

const Button = ({ destination, name }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setUserType({ userType: name }));
    navigate(destination);
  };

  return (
    <button
      className="mt-16 bg-inputBg w-3/6 rounded h-10 shadow-xl"
      onClick={() => handleClick()}
    >
      {name}
    </button>
  );
};

export default Button;

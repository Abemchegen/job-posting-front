import { useNavigate } from "react-router-dom";
import Button from "./Button";

const LandingType = ({ question = "", text = "", type = "" }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (type == "agent") {
      navigate("/signup?type=agent");
    } else if (type == "company") {
      navigate("/signup?type=company");
    }
  };
  return (
    <div className="max-w-120 mx-3 text-center mt-8 p-3 flex flex-col items-center bg-muted text-black shadow-sm rounded-lg ">
      <h2 className="text-3xl  font-bold mt-15">{question}</h2>
      <p className="my-15 p-3 h-15">{text}</p>
      <div className="mb-5">
        <Button onClick={() => handleNavigate()} text={"Get started!"}></Button>
      </div>
    </div>
  );
};

export default LandingType;

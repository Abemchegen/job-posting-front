import { FaSpinner } from "react-icons/fa";

export function Spinner() {
  return (
    <div className="flex felx-col justify-center items-center h-10 ">
      <FaSpinner className="animate-spin" size={50} color="#00a896" />
    </div>
  );
}

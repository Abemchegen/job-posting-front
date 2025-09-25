import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useEffect, useState } from "react";

export default function Login() {
  const { login, error, user } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    pas: "",
  });

  const [errors, setErrors] = useState({
    email: null,
    pas: null,
  });

  const navigate = useNavigate();

  function handleInput(e) {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });

    setErrors({
      ...errors,
      [id]: null,
    });
  }
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validateFormData() {
    let newerrors = {};
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newerrors.email = "Invalid Email address.";
    }

    setErrors(newerrors);
    return Object.keys(newerrors).length == 0;
  }

  useEffect(() => {
    if (user) {
      const timer = setTimeout(() => {
        if (user.role === "AGENT") {
          navigate("/home/agent");
        } else if (user.role === "COMPANY") {
          navigate("/home/company");
        } else if (user.role === "ADMIN") {
          navigate("/home/admin");
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [user, navigate]);

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!validateFormData()) return;

    setIsSubmitting(true);

    try {
      const submitData = {
        email: formData.email.trim(),
        password: formData.pas.trim(),
      };

      // api call
      await login(submitData);
      setIsSubmitting(false);
      setSubmitted(1);
    } catch (e) {
      console.error("error loggin in ", e);
      setIsSubmitting(false);
      setSubmitted(2);
    }
  };
  return (
    <div className="h-full bg-muted">
      <div className="flex justify-center mt-15 ">
        <div className="max-w-md w-full bg-white mt-20  p-7 shadow-sm rounded-2xl">
          {submitted == 1 && (
            <div className="flex justify-end font-bold text-gray-500">
              <h1>Log in successfull!</h1>
            </div>
          )}
          <h1 className="text-center mb-3 font-bold text-2xl">Log in</h1>
          <p className="text-center mb-3">
            Enter your credentials to access your account
          </p>
          <form className="flex flex-col mb-4 " onSubmit={handlesubmit}>
            <div className="flex flex-col mb-4 space-y-2">
              <label htmlFor="email">Email: </label>
              <input
                className="border border-gray-300 focus:outline-none focus:border-gray-400 shadow-sm rounded-lg py-1 px-2"
                type="email"
                id="email"
                required={true}
                onChange={handleInput}
              ></input>
              {errors.email && <p className="text-red-500"> {errors.email}</p>}
              <label htmlFor="pas">Password: </label>
              <input
                className="border border-gray-300 focus:outline-none focus:border-gray-400  shadow-sm rounded-lg py-1 px-2"
                type="password"
                id="pas"
                required={true}
                onChange={handleInput}
              ></input>
              {errors.pas && <p className="text-red-500"> {errors.pas}</p>}
            </div>

            {!isSubmitting && <Button text={"Sign in"} type="submit"></Button>}
            {isSubmitting && <Button text={"Signing in..."}></Button>}

            {submitted == 2 && (
              <div>
                <p className="text-red-500">
                  Login not successfull :{" "}
                  {error && <span className="text-red-500">{error}</span>}
                </p>
              </div>
            )}
          </form>

          <p className="text-center">
            Don't have an account?
            <Link
              to="/registerType"
              className="text-blue-600 ml-1 hover:text-blue-800"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

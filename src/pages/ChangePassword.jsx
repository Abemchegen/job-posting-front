import { useEffect, useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
  const user = {
    role: "company",
  };
  const [formData, setFormData] = useState({
    email: "",
    oldpas: "",
    newpas: "",
  });

  const [errors, setErrors] = useState({
    email: null,
    oldpas: null,
    newpas: null,
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
    if (!formData.email.trim()) {
      newerrors.email = "Email can not be empty";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newerrors.email = "Invalid Email address.";
    }

    if (!formData.oldpas.trim()) {
      newerrors.oldpas = "Old Password can not be empty";
    }
    if (!formData.newpas.trim()) {
      newerrors.newpas = "New Password can not be empty";
    }

    setErrors(newerrors);
    return Object.keys(newerrors).length == 0;
  }
  useEffect(() => {
    if (submitted == 1) {
      const timer = setTimeout(() => {
        if (user.role == "agent") {
          navigate("/home/agent");
        } else if (user.role == "company") {
          navigate("/home/company");
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [submitted]);
  function handlesubmit(e) {
    e.preventDefault();
    if (!validateFormData()) return;

    setIsSubmitting(true);

    try {
      const submitData = new FormData();
      submitData.append("email", formData.email.trim());
      submitData.append("oldpas", formData.oldpas.trim());
      submitData.append("newpas", formData.newpas.trim());

      // api call

      setIsSubmitting(false);
      setSubmitted(1);
      setFormData({
        email: "",
        oldpas: "",
        newpas: "",
      });
    } catch (e) {
      console.error("error changing password ", e);
      setIsSubmitting(false);
      setSubmitted(2);
    }
  }
  return (
    <div className="h-full bg-muted">
      <div className="flex justify-center mt-15 ">
        <div className="max-w-md w-full bg-white mt-10  p-7 shadow-sm rounded-2xl">
          {submitted == 1 && (
            <div className="flex justify-end font-bold text-gray-500">
              <h1>Password changed successfully!</h1>
            </div>
          )}
          <h1 className="text-center mb-3 font-bold text-2xl">
            Change Password
          </h1>
          <p className="text-center mb-3">
            Enter your credentials to change your password
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
              <label htmlFor="pas">Old Password: </label>
              <input
                className="border border-gray-300 focus:outline-none focus:border-gray-400  shadow-sm rounded-lg py-1 px-2"
                type="password"
                id="oldpas"
                required={true}
                onChange={handleInput}
              ></input>
              {errors.pas && <p className="text-red-500"> {errors.oldpas}</p>}
              <label htmlFor="pas">New Password: </label>
              <input
                className="border border-gray-300 focus:outline-none focus:border-gray-400  shadow-sm rounded-lg py-1 px-2"
                type="password"
                id="newpas"
                required={true}
                onChange={handleInput}
              ></input>
              {errors.pas && <p className="text-red-500"> {errors.newpas}</p>}
            </div>

            {!isSubmitting && (
              <div className="w-full flex mt-7 justify-center">
                <div className="w-30">
                  <Button text={"Change"} type="submit"></Button>
                </div>
              </div>
            )}
            {isSubmitting && <Button text={"Submitting..."}></Button>}

            {submitted == 2 && (
              <div>
                <p className="text-red-500">Password change not successfull</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

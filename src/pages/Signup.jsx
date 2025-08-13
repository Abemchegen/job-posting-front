import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";

export default function Signup() {
  const { register, user, error } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const type = searchParams.get("type");
  const isAgent = type === "agent";

  const [submitted, setsubmitted] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    birthdate: "",
    email: "",
    phonenumber: "",
    pas: "",
    conpas: "",
    companyPhonenumber: "",
    companyName: "",
  });
  const [errors, setErrors] = useState({
    fullName: null,
    birthdate: null,
    email: null,
    phonenumber: null,
    pas: null,
    conpas: null,
    companyPhonenumber: null,
    companyName: null,
  });
  const [isLoading, setIsLoading] = useState(false);

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
  useEffect(() => {
    if (user) {
      const timer = setTimeout(() => {
        if (user.role === "AGENT") {
          navigate("/home/agent");
        } else if (user.role === "COMPANY") {
          navigate("/home/company");
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [user, navigate]);

  function validateFormData() {
    let newErrors = {};
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = "Invalid Email address.";
    }
    if (formData.pas.length < 6) {
      newErrors.pas = "Password must be at least 6 characters long";
    }
    if (formData.conpas.trim() !== formData.pas.trim()) {
      newErrors.conpas = "Password and conform  are not matching";
    }
    setErrors({ ...errors, ...newErrors });
    return Object.keys(newErrors).length == 0;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFormData()) return;

    try {
      setIsLoading(true);

      const submitData = {
        name: formData.fullName.trim(),
        email: formData.email.trim(),
        role: isAgent ? "AGENT" : "COMPANY",
        phonenumber: Number(formData.phonenumber.toString().trim()),
        birthdate: formData.birthdate.trim(),
        password: formData.pas.trim(),
      };
      if (!isAgent) {
        submitData.companyName = formData.companyName.trim();
        submitData.companyPhonenumber = Number(
          formData.companyPhonenumber.toString().trim()
        );
      }
      await register(submitData);
      setsubmitted(true);
    } catch (e) {
      console.error("Error submitting", e);
      setsubmitted(false);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <div className="flex items-center mt-15 justify-center ">
        <div className="w-2/3 flex flex-col items-center space-y-3 shadow-sm bg-white p-7 rounded-2xl mb-10 max-w-lg">
          {submitted == true && (
            <div className="flex w-full justify-end">
              <h1 className="font-bold text-gray-500">
                Account created successfully!
              </h1>
            </div>
          )}
          <h2 className="text-2xl text-center font-bold mb-5">
            Create an account!
          </h2>
          {isAgent && (
            <p className="text-center text-gray-500 mb-5">
              Let's find your next opportunity!
            </p>
          )}
          {!isAgent && (
            <p className="text-center text-gray-500 mb-5">
              Ready to hire? Let's get your job listing published.
            </p>
          )}
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-2">
              <div className="flex w-full">
                <div className="w-1/2 flex flex-col mr-2">
                  <label htmlFor="fullName">Full name: </label>
                  <input
                    id="fullName"
                    type="text"
                    required={true}
                    onChange={handleInput}
                    className="w-full border border-gray-300 shadow-sm rounded-lg  focus:outline-none focus:border-gray-400 py-1 px-2"
                  />
                  {errors.fullname && (
                    <p className="text-red-500">{errors.fullName}</p>
                  )}
                </div>
                <div className="w-1/2 flex flex-col ">
                  <label htmlFor="email">Email: </label>
                  <input
                    id="email"
                    type="text"
                    required={true}
                    onChange={handleInput}
                    className="border border-gray-300 shadow-sm rounded-lg  focus:outline-none focus:border-gray-400 py-1 px-2"
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email}</p>
                  )}
                </div>
              </div>
              <div className="flex w-full">
                <div className="flex flex-col mr-2 w-1/2">
                  <label htmlFor="birthdate">Birthdate: </label>
                  <input
                    id="birthdate"
                    type="date"
                    required={true}
                    onChange={handleInput}
                    className="border border-gray-300 shadow-sm rounded-lg  focus:outline-none focus:border-gray-400 py-1 px-2"
                  />
                  {errors.birthdate && (
                    <p className="text-red-500">{errors.birthdate}</p>
                  )}
                </div>
                <div className="flex flex-col w-1/2">
                  <label htmlFor="phonenumber">Phone number: </label>
                  <input
                    id="phonenumber"
                    type="number"
                    required={true}
                    onChange={handleInput}
                    className="border border-gray-300 shadow-sm rounded-lg  focus:outline-none focus:border-gray-400 py-1 px-2"
                  />
                </div>
                {errors.phonenumber && (
                  <p className="text-red-500">{errors.phonenumber}</p>
                )}
              </div>
              {!isAgent && (
                <div className="flex">
                  <div className="flex flex-col w-1/2 mr-2">
                    <label htmlFor="companyName">Company name: </label>
                    <input
                      id="companyName"
                      type="text"
                      required={true}
                      onChange={handleInput}
                      className="border border-gray-300 shadow-sm rounded-lg  focus:outline-none focus:border-gray-400 py-1 px-2"
                    />
                    {errors.companyName && (
                      <p className="text-red-500">{errors.companyName}</p>
                    )}
                  </div>
                  <div className="flex flex-col w-1/2">
                    <label htmlFor="companyPhonenumber">
                      Company Phonenumber:{" "}
                    </label>
                    <input
                      id="companyPhonenumber"
                      type="number"
                      required={true}
                      onChange={handleInput}
                      className="border border-gray-300 shadow-sm rounded-lg  focus:outline-none focus:border-gray-400 py-1 px-2"
                    />
                    {errors.companyPhonenumber && (
                      <p className="text-red-500">
                        {errors.companyPhonenumber}
                      </p>
                    )}
                  </div>
                </div>
              )}
              <div className="flex">
                <div className="w-1/2 flex flex-col mr-2">
                  <label htmlFor="pas">Password: </label>
                  <input
                    id="pas"
                    type="password"
                    required={true}
                    onChange={handleInput}
                    className="border border-gray-300 shadow-sm rounded-lg  focus:outline-none focus:border-gray-400 py-1 px-2"
                  />
                  {errors.pas && <p className="text-red-500">{errors.pas}</p>}{" "}
                </div>
                <div className="w-1/2 flex flex-col">
                  <label htmlFor="conpas">Conform Password: </label>
                  <input
                    id="conpas"
                    type="password"
                    required={true}
                    onChange={handleInput}
                    className="border border-gray-300 shadow-sm rounded-lg  focus:outline-none focus:border-gray-400 py-1 px-2"
                  />
                  {errors.conpas && (
                    <p className="text-red-500">{errors.conpas}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-center gap-2">
              <div>
                <Button
                  onClick={() => navigate("/")}
                  text="Close"
                  variant="dark"
                ></Button>
              </div>
              <div>
                {!isLoading && <Button type="submit" text="Continue"></Button>}
                {isLoading && <Button text="Submitting..."></Button>}
              </div>
            </div>
          </form>
          {submitted === false && (
            <p className="text-red-500">Submission failed</p>
          )}
          {error && <div className="text-red-500">{error}</div>}

          <p className="text-center">
            Already have an account?
            <Link
              to={"/login"}
              className="ml-1 text-blue-600 hover:text-blue-700"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

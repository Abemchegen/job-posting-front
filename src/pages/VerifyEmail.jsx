import { useEffect, useState } from "react";
import Button from "../components/Button";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../components/Spinner";

export default function VerifyEmail() {
  const { verifyEmail, resendVerCode, setUser, user } = useAuth();
  const [verifyData, setVerifyData] = useState({
    code: "",
    email: "",
  });
  const [verified, setVerified] = useState(null);
  const [errors, setErrors] = useState({
    code: "",
    email: "",
  });
  const [resend, setResend] = useState(null);
  const [resendLoading, setResendLoading] = useState(null);
  const [verifyLoading, setVerifyLoading] = useState(null);

  const validate = () => {
    let valid = true;
    let newErrors = { code: null, email: null };

    if (!verifyData.code || verifyData.code.length < 6) {
      newErrors.code = "Code must be 6 digits";
      valid = false;
    }
    if (!verifyData.email) {
      newErrors.email = "Email must not be empty";
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };
  const handleVerify = async () => {
    try {
      setVerifyLoading(true);
      if (!validate()) {
        console.log("less than 6 digits");
        return;
      }
      const data = {
        code: verifyData.code.trim(),
        email: verifyData.email.trim(),
      };
      console.log(data);
      const res = await verifyEmail(data);
      // setUser(res.response);
      console.log("verified!!", res);
      setVerified(true);
    } catch (e) {
      console.log(e);
      setVerified(false);
    } finally {
      setVerifyLoading(false);
    }
  };
  const resendCode = async () => {
    try {
      if (!verifyData.email) {
        setErrors({
          ...errors,
          email: "Email must not be empty",
        });
        return;
      }
      setResendLoading(true);
      await resendVerCode(verifyData.email);
      setResend(true);
    } catch (e) {
      console.log(e);
      setResend(false);
    } finally {
      setResendLoading(false);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (verified && user) {
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
  }, [user, verified, navigate]);

  return (
    <div className="flex items-center mt-25 justify-center w-full">
      <div className="bg-white text-gray-600 max-w-md p-5 space-y-3 flex flex-col rounded-lg shadow-lg w-full">
        <h1 className="font-bold text-center text-xl ">
          Please verify your email
        </h1>
        <p>
          An authentication code has been sent to the email adress you have
          registered with.
        </p>
        {resend == true && (
          <div>
            <p>Code resent!</p>
          </div>
        )}
        <div className="space-x-5">
          <div className="mb-5 ">
            <p>Email</p>
            <input
              type="text"
              className="outline-none w-full  focus:border-gray-400   text-gray-500  px-2 py-1 border rounded"
              value={verifyData.email}
              placeholder="Enter email"
              onChange={(e) => {
                setVerifyData({ ...verifyData, email: e.target.value });
                setErrors({
                  ...errors,
                  email: null,
                });
              }}
            />
            {errors.email && (
              <div>
                <p className="text-red-500">{errors.email}</p>
              </div>
            )}
          </div>
          <div className="mb-5 w-full">
            <p>Authentication Code</p>
            <input
              type="text"
              maxLength={6}
              required={true}
              className=" w-full outline-none focus:border-gray-400 tracking-widest text-gray-500  px-2 py-1 border rounded"
              value={verifyData.code}
              onChange={(e) => {
                setVerifyData({ ...verifyData, code: e.target.value });
                setErrors({
                  ...errors,
                  code: null,
                });
              }}
              placeholder="Enter 6-digit code"
            />
            {errors.code && (
              <div>
                <p className="text-red-500">{errors.code}</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex space-x-5 w-full items-center">
          <div className="w-1/2 flex items-center justify-center">
            {!resendLoading && (
              <Button
                text={"Resend Code"}
                variant="dark"
                onClick={() => resendCode()}
              />
            )}
            {resendLoading && (
              <Button text={"Sending Code..."} variant="dark" disabled={true} />
            )}
          </div>

          <div className="w-1/2 flex items-center justify-center">
            {!verifyLoading && (
              <Button text={"Verify"} onClick={() => handleVerify()} />
            )}
            {verifyLoading && <Button text={"Verifying..."} disabled={true} />}
          </div>
        </div>
      </div>
    </div>
  );
}

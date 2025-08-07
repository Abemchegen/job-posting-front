import { useState } from "react";
import CloudImage from "../CloudImage";
import {
  ArrowLeft,
  Clock,
  House,
  Mail,
  Phone,
  PhoneIcon,
  PhoneMissed,
  PhoneOffIcon,
  Telescope,
  User,
} from "lucide-react";
import Button from "../Button";
import { Link, useNavigate } from "react-router-dom";

export default function UserCard({ detail = false }) {
  const navigate = useNavigate();
  const user = {
    fullname: "Abem Tigist",
    phonenumber: "3939393939",
    email: "dfjslj@fkdjf.com",
    birthdate: "1999-01-11",
    role: "company",
    password: "********",
    id: 1,
    pfp: "cld-sample-5",
    companyName: "Abu coffee",
    companyPhonenumber: "3483927493",
  };
  const [userData, setUserData] = useState({
    fullname: user.fullname,
    phonenumber: user.phonenumber,
    email: user.email,
    birthdate: user.birthdate,
    role: user.role,
    pfp: user.pfp,
    id: 1,
    companyName: user.companyName,
    companyPhonenumber: user.companyPhonenumber,
  });
  return (
    <div>
      {!detail && (
        <div className="bg-white flex justify-between items-center p-7 my-5 rounded-xl shadow-sm">
          <div className="flex flex-col mb-3 space-x-3  ">
            <div className="flex items-center">
              <div className="rounded-full mr-5 mb-5 w-28 h-28">
                <CloudImage className="rounded-full" publicId={userData.pfp} />
              </div>
              <p className="text-brand text-xl font-bold hover:text-brand-dark">
                {userData.fullname}
              </p>
            </div>
            <div className="flex space-x-3">
              <div className="text-gray-500 space-x-2 font-semibold flex items-center ">
                <Mail className="w-5 " />
                <p>{userData.email}</p>
              </div>
              <div className="flex items-center space-x-2 text-gray-500 font-semibold ">
                {user.role == "company" && <House className="w-5 " />}
                {user.role == "agent" && <User className="w-5 " />}
                <p>{user.role == "agent" ? "Agent" : "Company"}</p>
              </div>
              <div className="flex items-center space-x-2 text-gray-500 font-semibold">
                <Phone className="mr-3 w-5" />
                <p className="">{user.phonenumber}</p>
              </div>
            </div>
          </div>

          <div className="w-30">
            <Button
              text={"View Details"}
              onClick={() => {
                navigate(`/userdetail?id=${userData.id}`);
              }}
            />
          </div>
        </div>
      )}

      {detail && (
        <div>
          {/* <Link className="flex  text-brand hover:text-brand-light hover:cursor-pointer">
            <ArrowLeft className="mr-2" /> Back to Home
          </Link> */}

          <div className="bg-white flex flex-col  p-7 my-5 rounded-xl shadow-sm">
            <div className="flex justify-center">
              <div className="flex w-2/3 mb-5 justify-between space-x-5 items-center">
                <div className="rounded-full mb-5 w-50 h-50">
                  <CloudImage
                    className="rounded-full"
                    publicId={userData.pfp}
                  />
                </div>
                <div className="flex flex-col space-y-3 items-center">
                  <p className="text-brand text-xl font-bold hover:text-brand-dark">
                    {userData.fullname}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="flex text-gray-500 space-y-2 flex-col w-full md:w-4/5  justify-center ">
                <div className="space-x-4 flex justify-between">
                  <div className="flex space-x-1 items-center">
                    <Mail className="w-4" />
                    <p className="font-semibold ">Email:</p>
                  </div>

                  <p className="">{userData.email}</p>
                </div>
                <div className="space-x-4 flex justify-between">
                  <div className="flex space-x-1 items-center">
                    <Phone className="w-4" />
                    <p className="font-semibold  ">Phone Number:</p>
                  </div>
                  <p className="">{userData.phonenumber}</p>
                </div>
                <div className="space-x-4 flex justify-between">
                  <div className="flex space-x-1 items-center">
                    <Clock className="w-4" />
                    <p className="font-semibold ">Birth date:</p>
                  </div>
                  <p className="">{userData.birthdate}</p>
                </div>
                <div className="space-x-4 flex justify-between">
                  <div className="flex space-x-1 items-center">
                    <User className="w-4" />
                    <p className="font-semibold ">Role:</p>
                  </div>
                  <p className="">
                    {userData.role == "company" ? "Company" : "Agent"}
                  </p>
                </div>
                {userData.role == "company" && (
                  <>
                    <div className="space-x-4 flex justify-between">
                      <div className="flex space-x-1 items-center">
                        <House className="w-4" />
                        <p className="font-semibold ">Company Name:</p>
                      </div>
                      <p className="">{user.companyName}</p>
                    </div>
                    <div className="space-x-4 flex justify-between">
                      <div className="flex space-x-1 items-center">
                        <Phone className="w-4" />
                        <p className="font-semibold ">Company Phone number:</p>
                      </div>
                      <p className="">{user.companyPhonenumber}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

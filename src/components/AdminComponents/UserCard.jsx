import { useState } from "react";
import CloudImage from "../CloudImage";
import { Clock, House, Mail, Phone, User } from "lucide-react";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { GiPoliceBadge } from "react-icons/gi";

export default function UserCard({ detail = false, user }) {
  const navigate = useNavigate();

  const roleLabels = {
    COMPANY: "Company",
    AGENT: "Agent",
    ADMIN: "Admin",
  };
  return (
    <div
      className="w-full max-w-4xl
    "
    >
      {!detail && (
        <div className="bg-white m-2 flex justify-between items-center p-7 w-full my-5 rounded-xl shadow-sm">
          <div className="flex flex-1 max-w-[70%] overflow-hidden flex-col mb-3">
            <div className="flex items-center">
              <div className="flex-shrink-0 rounded-full mr-5 mb-5 w-20 h-20 md:w-20 md:h-20 ">
                {user.pfp && (
                  <CloudImage className="rounded-full" publicId={user.pfp} />
                )}
                {!user.pfp && (
                  <User className="rounded-full w-full h-full text-gray-400 bg-gray-100 p-4" />
                )}
              </div>
              <p className="text-brand text-xl font-bold hover:text-brand-dark">
                {user.name}
              </p>
            </div>
            <div className="flex min-w-0 overflow-hidden truncate  space-x-5">
              <div className="text-gray-500 space-x-2 font-semibold flex items-center ">
                <Mail className="w-5 " />
                <p className="truncate">{user.email}</p>
              </div>
              <div className="flex items-center space-x-2 text-gray-500 font-semibold ">
                {user.role == "COMPANY" && <House className="w-5 " />}
                {user.role == "AGENT" && <User className="w-5 " />}
                {user.role == "ADMIN" && <GiPoliceBadge className="w-5 " />}
                <p className="truncate">{roleLabels[user.role]}</p>
              </div>
              <div className="flex items-center space-x-2 text-gray-500 font-semibold">
                <Phone className="mr-3 w-5" />
                <p className="truncate">{user.phonenumber}</p>
              </div>
            </div>
          </div>

          <div className="w-30">
            <Button
              text={"View Details"}
              onClick={() => {
                navigate(`/userdetail?id=${user.id}`);
              }}
            />
          </div>
        </div>
      )}

      {detail && (
        <div className="w-full">
          <div className="bg-white flex flex-col p-7  m-2 my-5 rounded-xl shadow-sm">
            <div className="flex justify-center">
              <div className="flex w-2/3 mb-5 justify-between space-x-5 items-center">
                <div className="rounded-full items-center mb-5 w-30 h-30 md:w-50 md:h-50">
                  {user.pfp && (
                    <CloudImage className="rounded-full" publicId={user.pfp} />
                  )}
                  {!user.pfp && (
                    <User className="rounded-full w-full h-full text-gray-400 bg-gray-100 p-4" />
                  )}
                </div>
                <div className="flex flex-col space-y-3 items-center">
                  <p className="text-brand text-xl font-bold hover:text-brand-dark">
                    {user.name}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center overflow-hidden">
              <div className="flex text-gray-500 space-y-2 flex-col w-full md:w-4/5  justify-center ">
                <div className="space-x-4 flex justify-between">
                  <div className="flex space-x-1 items-center">
                    <Mail className="w-4" />
                    <p className="font-semibold ">Email:</p>
                  </div>

                  <p className="">{user.email}</p>
                </div>
                <div className="space-x-4 flex justify-between">
                  <div className="flex space-x-1 items-center">
                    <Phone className="w-4" />
                    <p className="font-semibold  ">Phone Number:</p>
                  </div>
                  <p className="">{user.phonenumber}</p>
                </div>
                <div className="space-x-4 flex justify-between">
                  <div className="flex space-x-1 items-center">
                    <Clock className="w-4" />
                    <p className="font-semibold ">Birth date:</p>
                  </div>
                  <p className="">{user.birthdate}</p>
                </div>
                <div className="space-x-4 flex justify-between">
                  <div className="flex space-x-1 items-center">
                    <User className="w-4" />
                    <p className="font-semibold ">Role:</p>
                  </div>
                  <p className="">{roleLabels[user.role]}</p>
                </div>
                {user.role == "COMPANY" && (
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

import { Camera, Plus, Trash, XIcon } from "lucide-react";
import Button from "../../components/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CloudImage from "../../components/CloudImage";
import { useAuth } from "../../context/authContext";
import { Spinner } from "../../components/Spinner";
export default function CompanyAccount() {
  const {
    user,
    deleteAccount,
    updateAccount,
    uploadPfp,
    loading,
    updateCompanyDetails,
  } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: null,
    phonenumber: null,
    email: null,
    birthdate: null,
    role: null,
    pfp: null,
    companyPhonenumber: null,
    companyName: null,
  });
  useEffect(() => {
    if (user) {
      setUserData({
        name: user.name,
        phonenumber: user.phonenumber,
        email: user.email,
        birthdate: user.birthdate,
        role: user.role,
        pfp: user.pfp,
        companyName: user.companyName,
        companyPhonenumber: user.companyPhonenumber,
      });
    }
  }, [user]);
  const [edit, setEdit] = useState(false);
  const [changePfp, setChangePfp] = useState(false);
  const [deletePfp, setDeletePfp] = useState(false);
  const [deleteAccountConform, setDeleteAccountConform] = useState(false);
  const [deleteAccountProccede, setDeleteAccountProccede] = useState(false);

  useEffect(() => {
    if (deleteAccountProccede) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [deleteAccountProccede]);
  const handleDeleteAccount = async () => {
    try {
      await deleteAccount(user.id);
      setDeleteAccountProccede(true);
    } catch (e) {
      console.log(e);
    }
  };

  const submitform = async (e) => {
    e.preventDefault();
    try {
      const updateData = {};
      if (userData.birthdate.trim()) {
        updateData.birthdate = userData.birthdate.trim();
      }
      if (userData.name.trim()) {
        updateData.name = userData.name.trim();
      }
      if (userData.phonenumber.trim()) {
        updateData.phonenumber = userData.phonenumber.trim();
      }
      if (userData.email.trim()) {
        updateData.email = userData.email.trim();
      }

      await updateAccount(user.id, updateData);

      const updateCompanyData = {};
      if (userData.companyName.trim()) {
        updateCompanyData.name = userData.companyName.trim();
      }
      if (userData.companyPhonenumber.trim()) {
        updateCompanyData.phonenumber = userData.companyPhonenumber.trim();
      }

      if (updateCompanyData != null) {
        await updateCompanyDetails(updateCompanyData);
      }

      setEdit(false);
    } catch (e) {
      console.log(e);
    }
  };
  function clearinput() {
    setUserData({
      name: user.name,
      phonenumber: user.phonenumber,
      email: user.email,
      birthdate: user.birthdate,
      role: user.role,
      companyName: user.companyName,
      companyPhonenumber: user.companyPhonenumber,
      pfp: user.pfp,
    });
  }

  const handleUpload = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const url = await uploadPfp(user.id, formData);
        console.log(url);
        setUserData({
          ...userData,
          pfp: url,
        });
      } catch (e) {
        console.log(e);
      } finally {
        setChangePfp(false);
      }
    }
  };

  const handleDelete = async () => {
    try {
      await deletePic(user.id);
      setUserData({
        ...userData,
        pfp: "",
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="w-full">
      {loading && (
        <div className="flex justify-center items-center mt-50 space-x-5">
          <Spinner />
          <p className="text-xl font-semibold text-gray-500">Loading...</p>
        </div>
      )}
      {!loading && !user && (
        <div className="flex justify-center items-center mt-50 space-x-5">
          <div>Can't fetch your data at the moment...</div>
        </div>
      )}
      {!loading && !!user && (
        <>
          <div className="flex justify-center min-h-[calc(100vh-80px)]">
            <div className="w-full max-w-4xl m-3 p-6 bg-white rounded-lg flex flex-col items-center">
              <div className="w-full p-3">
                <div className="flex md:flex-row flex-col justify-between items-center mb-10">
                  <div className="flex items-center mb-3">
                    <div className="mr-3" onClick={() => {}}>
                      {userData.pfp && (
                        <div
                          className="rounded-full w-30 h-30 flex flex-col items-center justify-center  cursor-pointer transition"
                          onClick={() => {
                            setChangePfp(true);
                          }}
                        >
                          <CloudImage
                            className="rounded-full"
                            publicId={userData.pfp}
                            width={120}
                            height={120}
                          />
                        </div>
                      )}
                      {!userData.pfp && (
                        <div
                          className="rounded-full border-2 border-dashed border-gray-300 w-30 h-30 flex flex-col items-center justify-center bg-gray-50 cursor-pointer hover:bg-muted transition"
                          onClick={() => {
                            document.getElementById("pfp").click();
                          }}
                        >
                          <Plus className="text-gray-400 w-8 h-8 mb-1" />
                          <span className="text-gray-500 text-sm">
                            Upload Image
                          </span>
                          <input
                            id="pfp"
                            type="file"
                            hidden={true}
                            accept="image/*"
                            onChange={handleUpload}
                          ></input>
                        </div>
                      )}
                    </div>{" "}
                    <div className="flex flex-col">
                      <h1 className="text-2xl text-brand">
                        Welcome, {user.name.split(" ")[0]}
                      </h1>

                      <h2 className="text-xl text-brand-dark">
                        {user.companyName}
                      </h2>

                      <p className="text-gray-500 text-lg">
                        {new Date().toLocaleDateString()}
                      </p>
                    </div>{" "}
                  </div>{" "}
                  <div className="flex space-x-3">
                    <div>
                      <Button
                        text={"Edit Account"}
                        onClick={() => setEdit(true)}
                      />
                    </div>
                    <div>
                      <Button
                        variant="danger"
                        text={"Delete Account"}
                        onClick={() => handleDeleteAccount(true)}
                      />
                    </div>
                  </div>{" "}
                </div>

                <form className="flex justify-center" onSubmit={submitform}>
                  <div className="flex  flex-col space-y-2 ">
                    <div className="flex items-center md:flex-row flex-col md:gap-10">
                      <div className="flex md:w-sm w-xs md:mr-2 flex-col ">
                        <label htmlFor="fullName">Full name: </label>
                        <input
                          value={userData.name}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              name: e.target.value,
                            })
                          }
                          readOnly={!edit}
                          id="fullName"
                          type="text"
                          className={`border border-gray-300 shadow-sm rounded-lg focus:outline-none ${
                            edit ? " focus:border-gray-400" : ""
                          } py-1 px-2`}
                        ></input>
                      </div>
                      <div className="flex md:w-sm w-xs md:mr-2 flex-col">
                        <label htmlFor="email">Email: </label>
                        <input
                          readOnly={!edit}
                          onChange={(e) =>
                            setUserData({ ...userData, email: e.target.value })
                          }
                          value={userData.email}
                          id="email"
                          type="text"
                          className={`border border-gray-300 shadow-sm rounded-lg focus:outline-none ${
                            edit ? " focus:border-gray-400" : ""
                          } py-1 px-2`}
                        ></input>
                      </div>
                    </div>
                    <div className="flex items-center md:flex-row flex-col md:gap-10">
                      <div className="flex md:w-sm w-xs md:mr-2 flex-col">
                        <label htmlFor="birthdate">Birthdate: </label>
                        <input
                          readOnly={!edit}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              birthdate: e.target.value,
                            })
                          }
                          value={userData.birthdate}
                          id="birthdate"
                          type="date"
                          className={`border border-gray-300 shadow-sm rounded-lg focus:outline-none ${
                            edit ? " focus:border-gray-400" : ""
                          } py-1 px-2`}
                        ></input>
                      </div>
                      <div className="flex md:w-sm w-xs md:mr-2 flex-col">
                        <label htmlFor="phonenumber">Phone number: </label>
                        <input
                          readOnly={!edit}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              phonenumber: e.target.value,
                            })
                          }
                          value={userData.phonenumber}
                          id="phonenumber"
                          type="text"
                          className={`border border-gray-300 shadow-sm rounded-lg focus:outline-none ${
                            edit ? " focus:border-gray-400" : ""
                          } py-1 px-2`}
                        ></input>
                      </div>
                    </div>

                    <div className="flex items-center md:flex-row flex-col md:gap-10">
                      <div className="flex md:w-sm w-xs md:mr-2 flex-col">
                        <label htmlFor="companyName">Company name: </label>
                        <input
                          readOnly={!edit}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              companyName: e.target.value,
                            })
                          }
                          value={userData.companyName}
                          id="companyName"
                          type="text"
                          className={`border border-gray-300 shadow-sm rounded-lg focus:outline-none ${
                            edit ? " focus:border-gray-400" : ""
                          } py-1 px-2`}
                        ></input>
                      </div>
                      <div className="flex md:w-sm w-xs md:mr-2 flex-col">
                        <label htmlFor="companyphone">
                          Company Phonenumber:{" "}
                        </label>
                        <input
                          readOnly={!edit}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              companyPhonenumber: e.target.value,
                            })
                          }
                          value={userData.companyPhonenumber}
                          id="companyphone"
                          type="text"
                          className={`border border-gray-300 shadow-sm rounded-lg focus:outline-none ${
                            edit ? " focus:border-gray-400" : ""
                          } py-1 px-2`}
                        ></input>
                      </div>
                    </div>

                    {edit && (
                      <div className="flex justify-center space-x-5 mt-5">
                        <div className="w-19">
                          <Button
                            onClick={() => {
                              setEdit(false);
                              clearinput();
                            }}
                            text="Cancle"
                            variant="dark"
                          ></Button>
                        </div>
                        <div className="w-19">
                          <Button type="submit" text="Save"></Button>
                        </div>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
          {changePfp && (
            <div className="flex z-50 fixed inset-0 top-0 left-0 items-center justify-center h-full w-full">
              <div className="bg-white shadow-2xl rounded-lg text-black p-5 w-2/3 max-w-3xl  ">
                <div className="w-full">
                  <div className="flex justify-between mb-5">
                    <h1 className="text-2xl ">Profile photo</h1>
                    <XIcon
                      className="text-2xl hover:cursor-pointer"
                      onClick={() => setChangePfp(false)}
                    />
                  </div>

                  <div className="w-full flex flex-col items-center">
                    <div className="mb-15">
                      <CloudImage
                        className="rounded-full"
                        publicId={userData.pfp}
                        width={300}
                        height={300}
                      />
                    </div>
                  </div>
                  <div className="w-full flex justify-center">
                    <div className="w-1/4 flex ">
                      <div
                        className="mr-10 flex flex-col items-center hover:cursor-pointer"
                        onClick={() => {
                          document.getElementById("changePfp").click();
                        }}
                      >
                        <Camera />
                        <span>Change</span>
                        <input
                          id="changePfp"
                          type="file"
                          accept="image/*"
                          hidden={true}
                          onChange={() => {
                            handleUpload;
                            setChangePfp(false);
                          }}
                        ></input>
                      </div>
                      <div
                        className="flex flex-col items-center hover:cursor-pointer"
                        onClick={() => {
                          setDeletePfp(true);
                        }}
                      >
                        <Trash className="text-red-500" />
                        <span>Delete</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {deletePfp && (
            <div className="z-100 fixed inset-0 top-0 left-0 flex justify-center items-center">
              <div className="w-2/5 bg-white p-7 flex flex-col items-center shadow-2xl rounded-2xl">
                <div>
                  <div className="flex justify-between mb-7">
                    <h1 className="text-xl">Delete Profile photo</h1>
                    <XIcon onClick={() => setDeletePfp(false)} />
                  </div>

                  <p className="mb-7 text-center">
                    Are you sure? Having a profile picture helps others
                    recognize you.
                  </p>

                  <div className="flex space-x-3 justify-center">
                    <div>
                      <Button
                        text={"Cancle"}
                        onClick={() => setDeletePfp(false)}
                        variant="dark"
                      />
                    </div>
                    <div>
                      <Button
                        text={"Delete"}
                        onClick={() => {
                          handleDelete();
                          setDeletePfp(false);
                          setChangePfp(false);
                        }}
                        variant="danger"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {deleteAccountConform && (
            <div className="flex fixed inset-0 z-100 items-center justify-center">
              <div className="w-4/7 bg-white shadow-2xl rounded-2xl">
                {!deleteAccountProccede && (
                  <div className="flex flex-col items-center mt-5 rounded-xl p-6 ">
                    <h1 className="text-2xl font-bold mb-3">
                      Are you sure you want to delete your account?
                    </h1>
                    <p className="mb-5">
                      If you proccede, your account will be permanently deleted,
                      and can not be recovered.
                    </p>
                    <div className="flex space-x-3">
                      <div>
                        <Button
                          text={"Cancle"}
                          onClick={() => setDeleteAccountConform(false)}
                        />
                      </div>
                      <div>
                        <Button
                          text={"Proccede"}
                          variant="danger"
                          onClick={() => handleDeleteAccount()}
                        />
                      </div>
                    </div>
                  </div>
                )}
                {deleteAccountProccede && (
                  <div className="flex flex-col items-center mt-5  rounded-xl p-6 ">
                    <h1 className="text-2xl font-bold mb-3">
                      Your Account is deleted Successfully
                    </h1>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

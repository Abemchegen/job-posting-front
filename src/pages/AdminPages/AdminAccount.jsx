import { Camera, Plus, Trash, XIcon } from "lucide-react";
import Button from "../../components/Button";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import CloudImage from "../../components/CloudImage";
import { useAuth } from "../../context/authContext";
export default function AdminAccount() {
  const { user, deleteAccount, updateAccount } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    fullname: user.name,
    phonenumber: user.phonenumber,
    email: user.email,
    birthdate: user.birthdate,
    role: user.role,
  });
  const [pfpUrl, setPfpUrl] = useState("");
  const [edit, setEdit] = useState(false);
  const [changePfp, setChangePfp] = useState(false);
  const [deletePfp, setDeletePfp] = useState(false);
  const [deleteAccountConform, setDeleteAccountConform] = useState(false);
  const [deleteAccountProccede, setDeleteAccountProccede] = useState(false);

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount(user.id);
      setDeleteAccountProccede(true);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (deleteAccountProccede) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [deleteAccountProccede]);
  const submitform = async (e) => {
    e.preventDefault();
    try {
      const updateData = {};
      if (userData.birthdate.trim()) {
        updateData.birthdate = userData.birthdate.trim();
      }
      if (userData.fullname.trim()) {
        updateData.fullname = userData.fullname.trim();
      }
      if (userData.phonenumber.trim()) {
        updateData.phonenumber = userData.phonenumber.trim();
      }
      if (userData.companyName.trim()) {
        updateData.companyName = userData.companyName.trim();
      }
      if (userData.companyphone.trim()) {
        updateData.companyphone = userData.companyphone.trim();
      }
      if (userData.email.trim()) {
        updateData.email = userData.email.trim();
      }
      await updateAccount(user.id, updateData);
      setEdit(false);
    } catch (e) {
      console.log(e);
    }
  };
  function clearinput() {
    setUserData({
      fullname: user.fullname,
      phonenumber: user.phonenumber,
      email: user.email,
      birthdate: user.birthdate,
      role: user.role,
    });
  }

  function handleUpload(e) {
    const file = e.target.files[0];

    if (file) {
      const url = URL.createObjectURL(file);
      console.log(url);
      setPfpUrl(user.pfp);
    }
  }

  function handleDelete() {
    setPfpUrl("");
  }

  return (
    <div className="w-full">
      <div className="flex justify-center min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-4xl m-3 p-6 bg-white rounded-lg flex flex-col items-center">
          <div className="w-full p-3">
            <div className="flex justify-between mb-10">
              <div className="flex flex-col">
                <h1 className="text-2xl text-brand">
                  Welcome, {userData.fullname.split(" ")[0]}
                </h1>

                <p className="text-gray-500 text-lg">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
              <div className="mr-3" onClick={() => {}}>
                {pfpUrl && (
                  <div
                    className="rounded-full w-30 h-30 flex flex-col items-center justify-center  cursor-pointer transition"
                    onClick={() => {
                      setChangePfp(true);
                    }}
                  >
                    <CloudImage
                      className="rounded-full"
                      publicId={pfpUrl}
                      width={120}
                      height={120}
                    />
                  </div>
                )}
                {!pfpUrl && (
                  <div
                    className="rounded-full border-2 border-dashed border-gray-300 w-30 h-30 flex flex-col items-center justify-center bg-gray-50 cursor-pointer hover:bg-muted transition"
                    onClick={() => {
                      document.getElementById("pfp").click();
                    }}
                  >
                    <Plus className="text-gray-400 w-8 h-8 mb-1" />
                    <span className="text-gray-500 text-sm">Upload Image</span>
                    <input
                      id="pfp"
                      type="file"
                      hidden={true}
                      accept="image/*"
                      onChange={handleUpload}
                    ></input>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end mb-7">
              <div>
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
                      onClick={() => setDeleteAccountConform(true)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <form onSubmit={submitform}>
              <div className="flex justify-center flex-col space-y-2 ">
                <div className="flex items-center md:justify-between md:flex-row flex-col md:gap-10">
                  <div className="flex md:w-sm w-xs md:mr-2 flex-col ">
                    <label htmlFor="fullName">Full name: </label>
                    <input
                      value={userData.fullname}
                      onChange={(e) =>
                        setUserData({ ...userData, fullname: e.target.value })
                      }
                      readOnly={!edit}
                      id="fullName"
                      type="text"
                      className={`border border-gray-300 shadow-sm rounded-lg focus:outline-none ${
                        edit ? " focus:border-gray-400" : ""
                      } py-1 px-2`}
                    ></input>
                  </div>
                  <div className="flex md:w-sm  w-xs flex-col">
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
                <div className="flex items-center md:flex-row flex-col md:justify-between ">
                  <div className="flex md:w-sm w-xs flex-col">
                    <label htmlFor="birthdate">Birthdate: </label>
                    <input
                      readOnly={!edit}
                      onChange={(e) =>
                        setUserData({ ...userData, birthdate: e.target.value })
                      }
                      value={userData.birthdate}
                      id="birthdate"
                      type="date"
                      className={`border border-gray-300 shadow-sm rounded-lg focus:outline-none ${
                        edit ? " focus:border-gray-400" : ""
                      } py-1 px-2`}
                    ></input>
                  </div>
                  <div className="flex md:w-sm w-xs flex-col">
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
                    publicId={pfpUrl}
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
                Are you sure? Having a profile picture helps others recognize
                you.
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
                  If you proccede, your account will be permanently deleted, and
                  can not be recovered.
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
    </div>
  );
}

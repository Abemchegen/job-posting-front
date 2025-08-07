import { Calendar, DollarSign } from "lucide-react";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function CompanyJobPostCard({ job, detail = false }) {
  const navigate = useNavigate();
  const [deletePost, setDeletePost] = useState(false);
  const [deleteProccede, setDeleteProccede] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (deleteProccede) {
        navigate("/home/company");
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [deleteProccede]);
  return (
    <div>
      <div className="bg-white text-black m-5 space-y-2 rounded-xl shadow-sm p-7">
        <div className="flex mb-3 justify-between">
          <div className="flex flex-col">
            <p className="text-blue-600 text-xl mb-3 font-bold hover:text-blue-800">
              {job.title}
            </p>
            <p className="text-lg">{job.company}</p>
          </div>
          {!detail && (
            <div>
              <Button
                text={"View Details"}
                onClick={() => navigate(`/jobpostdetail/company?id=${job.id}`)}
              />
            </div>
          )}
          {detail && (
            <div className="flex space-x-5">
              <div>
                <Button
                  text={"View Applications"}
                  onClick={() => navigate(`/application?id=${job.id}`)}
                />
              </div>
              <div>
                <Button
                  variant="dark"
                  text={"Edit Job Post"}
                  onClick={() => navigate(`/editPost?id=${job.id}`)}
                />
              </div>
              <div>
                <Button
                  variant="danger"
                  text={"Delete Job Post"}
                  onClick={() => setDeletePost(true)}
                />
              </div>
            </div>
          )}
        </div>
        <div className="space-x-4 flex">
          <div className="flex">
            <DollarSign className="w-4 font-light text-gray-500"></DollarSign>
            <span className="text-gray-500"> {job.salary}</span>
          </div>
          <div className="flex">
            <Calendar className="w-4 font-light mr-1 text-gray-500"></Calendar>
            <span className="text-gray-500"> {job.date}</span>
          </div>
        </div>
        {!detail && <p>{job.description}</p>}
      </div>
      {detail && deletePost && (
        <div className="fixed inset-0 z-10 flex justify-center items-center">
          <div className="w-2/3 flex flex-col items-center bg-white shadow-sm rounded-sm p-5">
            <h1 className="text-2xl font-bold mb-3">
              Are you sure you want to delete this post?
            </h1>
            <p className="mb-5">
              Once you delete this Job post all applications that are assosiated
              to it are also deleted and can not be recovered.
            </p>
            <div className="flex space-x-5">
              <div className="w-30">
                <Button text={"Cancle"} onClick={() => setDeletePost(false)} />
              </div>
              <div className="w-30">
                <Button
                  text={"Delete"}
                  variant="danger"
                  onClick={() => {
                    setDeletePost(false);
                    setDeleteProccede(true);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {detail && deleteProccede && (
        <div className="fixed inset-0 z-10 flex justify-center items-center">
          <div className="w-2/3 flex flex-col items-center bg-white shadow-sm rounded-sm p-5">
            <h1 className="text-2xl font-bold mb-3">
              Job post Deleted Successfully
            </h1>
          </div>
        </div>
      )}
    </div>
  );
}

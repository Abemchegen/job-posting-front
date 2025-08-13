import { Calendar, DollarSign } from "lucide-react";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useJobPosts } from "../../hook/useJobPost";
import PostJobComp from "./PostJobComp";
import { BsPerson } from "react-icons/bs";
export default function CompanyJobPostCard({ jobPost, detail = false }) {
  const [jobPostData, setJobPostData] = useState({
    salary: jobPost.salary,
    peopleNeeded: jobPost.peopleNeeded,
    subcatDesc: jobPost.subcatDesc,
    subcatName: jobPost.subcatName,
    jobName: jobPost.jobName,
    description: jobPost.description,
    date: jobPost.date,
    id: jobPost.id,
  });
  const [updatedJobpost, setUpdatedJobpost] = useState(null);
  useEffect(() => {
    if (updatedJobpost) {
      setJobPostData({
        salary: updatedJobpost.salary,
        peopleNeeded: updatedJobpost.peopleNeeded,
        subcatDesc: updatedJobpost.subcatDesc,
        subcatName: updatedJobpost.subcatName,
        jobName: updatedJobpost.jobName,
        description: updatedJobpost.description,
        date: updatedJobpost.date,
        id: updatedJobpost.id,
      });
    }
  }, [updatedJobpost]);
  const { deleteJobPost } = useJobPosts();

  console.log("jobpostdata", jobPostData);
  const navigate = useNavigate();
  const [editPost, setEditPost] = useState(false);
  const [deleteProccede, setDeleteProccede] = useState(false);
  const [deletePost, setDeletePost] = useState(false);
  const handleDeletePost = async () => {
    try {
      const response = deleteJobPost(jobPostData.id);
      console.log(response);
      setDeleteProccede(true);
    } catch (e) {
      console.log(e);
    } finally {
      setDeletePost(false);
    }
  };

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
            <p className="text-blue-600 text-2xl mb-1 font-bold hover:text-blue-800">
              {jobPostData.jobName}
            </p>
            {jobPostData.subcatName && (
              <p className="text-gray-600 font-semibold">
                {jobPostData.subcatName}
              </p>
            )}
          </div>
          {!detail && (
            <div>
              <Button
                text={"View Details"}
                onClick={() =>
                  navigate(`/detailjobpost/company?id=${jobPostData.id}`)
                }
              />
            </div>
          )}
          {detail && (
            <div className="flex space-x-5">
              <div>
                <Button
                  text={"View Applications"}
                  onClick={() => navigate(`/application?id=${jobPostData.id}`)}
                />
              </div>
              <div>
                <Button
                  variant="dark"
                  text={"Edit Job Post"}
                  onClick={() => setEditPost(true)}
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
            <span className="text-gray-500"> {jobPostData.salary}</span>
          </div>
          <div className="flex">
            <Calendar className="w-4 font-light mr-1 text-gray-500"></Calendar>
            <span className="text-gray-500"> {jobPostData.date}</span>
          </div>
          <div className="flex items-center">
            <BsPerson className="w-4 font-light mr-1 text-gray-500"></BsPerson>
            <span className="text-gray-500"> {jobPostData.peopleNeeded}</span>
          </div>
        </div>
        {!detail && (
          <p className="whitespace-pre-wrap line-clamp-2">
            {jobPostData.description}
          </p>
        )}
        {detail && (
          <div className="text-black mt-10 space-y-2">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <p className="text-lg mb-4 ">Description</p>
                <p className="text-gray-600 whitespace-pre-wrap">
                  {jobPostData.description}
                </p>
              </div>
            </div>
          </div>
        )}
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
                    handleDeletePost();
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {detail && editPost && (
        <div className="fixed inset-0 z-10 flex items-center justify-center">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white">
            <PostJobComp
              create={false}
              Post={jobPostData}
              EditPost={setEditPost}
              updated={setUpdatedJobpost}
            />
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

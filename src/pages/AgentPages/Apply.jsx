import Button from "../../components/Button";
import { File, Upload } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useJobPost } from "../../hook/useJobPost";
import { Spinner } from "../../components/Spinner";
import { useApplications } from "../../hook/useApplications";
export default function Apply() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const jobId = searchParams.get("id");
  const { jobPost, loading } = useJobPost(jobId);
  const [submitted, setsubmitted] = useState(0);
  const { apply } = useApplications();
  const [formData, setFormData] = useState({
    coverLetter: "",
    cv: null,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  function handleFile(e) {
    const file = e.target.files[0];

    if (file) {
      setFormData({
        ...formData,
        cv: file,
      });

      if (errors.cv) {
        setErrors({
          ...errors,
          cv: null,
        });
      }
    }
  }
  function validateForm() {
    const newErrors = {};
    if (formData.cv == null && user.cv == null) {
      newErrors.cv =
        "You must either upload a cv or fill out the custom cv to make an application.";
    } else if (formData.cv && formData.cv.size > 5 * 1024 * 1024) {
      newErrors.cv = "You must either upload a file less than 5MB.";
    } else if (
      formData.coverLetter.trim().split(/\s+/).filter(Boolean).length < 150
    ) {
      newErrors.coverLetter = "You must write a minimum of 150 words.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length == 0;
  }
  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const appData = new FormData();
      appData.append("coverLetter", formData.coverLetter.trim());
      if (formData.cv) {
        appData.append("file", formData.cv);
      }
      const response = await apply(appData, jobPost.id);

      setsubmitted(1);
    } catch (error) {
      setsubmitted(2);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div>
      {(submitted == 0 || submitted == 2) && (
        <div className="flex justify-center mt-15">
          {!loading && !jobPost && (
            <div className="w-full">
              <p className="mt-8 font-semibold text-gray-500">
                Job Post not found at the moment...
              </p>
            </div>
          )}
          {loading && !jobPost && (
            <div className="flex justify-center items-center m-5 space-x-5">
              <Spinner />
              <p className="text-xl font-semibold text-gray-500">Loading...</p>
            </div>
          )}
          {jobPost && (
            <div className="bg-white w-3/4 max-w-2xl p-6 shadow-sm rounded-xl mb-3 ">
              <h1 className="text-2xl text-center mb-3 font-bold">
                Apply for {jobPost.jobName} position
              </h1>
              <p className="text-center mb-2 text-gray-500">
                Complete the form below to apply for this position at{" "}
                {jobPost.companyName}.
              </p>

              <form onSubmit={handlesubmit} className="w-full">
                <div className="flex flex-col space-y-2">
                  <div>
                    <label htmlFor="coverLetter">
                      Cover Letter{" "}
                      <span className="text-gray-500">{"(150 min)"}</span>
                      <span className="text-red-600">*</span>{" "}
                    </label>
                    <textarea
                      id="coverLetter"
                      rows={7}
                      cols={50}
                      required={true}
                      onChange={handleInput}
                      placeholder="Tell us why you're a good fit for this position..."
                      className="w-full border border-gray-300 shadow-sm rounded-lg focus:outline-none focus:border-gray-400 py-1 px-2"
                    ></textarea>
                    {errors.coverLetter && (
                      <p className="text-red-500 text-sm">
                        {errors.coverLetter}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="cv">CV </label>
                    <div className="border-2 border-gray-300 border-dashed rounded-lg p-4 flex flex-col items-center  text-gray-500">
                      {!formData.cv && (
                        <>
                          <div className=" flex flex-col items-center mb-4 ">
                            <Upload />
                            <p>Drag and drop your cv here or click to browse</p>
                            <p>Pdf only (Max 5MB)</p>
                          </div>
                          <input
                            id="cv"
                            type="file"
                            onChange={handleFile}
                            accept=".pdf"
                            className="hidden"
                          ></input>
                          <div className="w-25">
                            <Button
                              text={"Select File"}
                              onClick={() =>
                                document.getElementById("cv").click()
                              }
                            ></Button>
                          </div>
                        </>
                      )}
                      {formData.cv && (
                        <>
                          <div className="flex items-center space-x-3 mb-4 ">
                            <File className="text-green-500" />
                            <p>{formData.cv.name}</p>
                          </div>
                          <input
                            id="cv"
                            type="file"
                            onChange={handleFile}
                            accept=".pdf"
                            className="hidden"
                          ></input>
                          <div className="w-45 space-y-3 flex flex-col items-center">
                            <Button
                              text={"Select again"}
                              onClick={() =>
                                document.getElementById("cv").click()
                              }
                            ></Button>
                            <p>Pdf only (Max 5MB)</p>
                          </div>
                        </>
                      )}
                    </div>
                    {errors.cv && (
                      <p className="text-red-500 text-sm">{errors.cv}</p>
                    )}
                  </div>

                  <p className="text-gray-500">
                    You can upload your cv here or fill out our custom cv in the
                    <Link to={"/cv"} className="text-blue-400 mx-1">
                      account
                    </Link>{" "}
                    section.
                  </p>
                  <p className="mb-4 text-gray-500">
                    {" "}
                    Make sure that your account data and profile picture (if you
                    have one) is accurate in the{" "}
                    <Link to={"/account/agent"} className="text-blue-400 mx-1">
                      account
                    </Link>{" "}
                    section since it will be attached in your application!
                  </p>
                </div>
                <div className="mt-6 flex justify-center gap-2">
                  <div className="w-40">
                    <Button
                      onClick={() => {}}
                      text="Cancle"
                      variant="dark"
                      disabled={isSubmitting}
                    ></Button>
                  </div>
                  <div className="w-40 flex justify-center">
                    {!isSubmitting && (
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        text={"Submit Application"}
                      ></Button>
                    )}
                    {isSubmitting && <Spinner />}
                  </div>
                </div>
                {submitted == 2 && (
                  <div className=" flex flex-col items-center text-center">
                    <p className="text-red-500 mt-10 mb-5 font-lg">
                      Error submitting Application.
                    </p>
                  </div>
                )}
              </form>
            </div>
          )}
        </div>
      )}
      {submitted == 1 && (
        <div>
          <div className=" flex flex-col items-center text-center">
            <h1 className="text-3xl font-bold mt-20 mb-5">
              Application submitted Successfully!
            </h1>
            <p className="text-gray-500 font-lg">
              Go to{" "}
              <Link to={"/myapplications"} className="text-blue-500">
                Your applications{" "}
              </Link>{" "}
              to track all the applications you have submitted.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

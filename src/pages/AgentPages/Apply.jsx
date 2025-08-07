import Button from "../../components/Button";
import { Upload } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function Apply() {
  const user = {
    fullname: "Abem Tigist",
    email: "abem.chegen@gmail.com",
    phonenumber: "0909268285",
  };
  const job = {
    title: "Frontend Developer",
    company: "Tech Corp",
    salary: "80,000",
    date: "2025-07-22",
    description: "Build and maintain web applications using React.",
  };
  const [searchParams] = useSearchParams();
  const jobId = searchParams.get("id");

  const [submitted, setsubmitted] = useState(0);
  const [formData, setFormData] = useState({
    fullName: user.fullname,
    email: user.email,
    phoneNumber: user.phonenumber,
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

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required.";
    }
    if (!formData.coverLetter.trim()) {
      newErrors.coverLetter = "Cover Letter is required.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid Email address.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length == 0;
  }
  function handlesubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const submitData = new FormData();
      submitData.append("jobId", jobId);
      submitData.append("full_name", formData.fullName.trim());
      submitData.append("email", formData.email.trim());
      submitData.append("phone", formData.phoneNumber.trim());
      submitData.append("cover_letter", formData.coverLetter.trim());
      if (formData.cv) {
        submitData.append("cv", formData.cv);
      }

      // api call here
      setIsSubmitting(false);
      setsubmitted(1);
      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        coverLetter: "",
        cv: null,
      });
    } catch (error) {
      console.error("Error submitting", error);
      setIsSubmitting(false);
      setsubmitted(2);
    }
  }
  return (
    <div>
      {(submitted == 0 || submitted == 2) && (
        <div className="flex justify-center mt-15">
          <div className="bg-white w-3/4 max-w-lg p-6 shadow-sm rounded-xl mb-3 ">
            <h1 className="text-2xl text-center mb-3 font-bold">
              Apply for {job.title}
            </h1>
            <p className="text-center mb-4 text-gray-500">
              Complete the form below to apply for this position at{" "}
              {job.company}.
            </p>
            <form onSubmit={handlesubmit} className="w-full">
              <div className="flex flex-col space-y-2">
                <div>
                  <label htmlFor="fullName">
                    Full name <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={formData.fullName}
                    required={true}
                    onChange={handleInput}
                    className="w-full border border-gray-300 shadow-sm rounded-lg focus:outline-none focus:border-gray-400 py-1 px-2"
                  ></input>
                  {errors.fullName && (
                    <p className="text-red-500 text-sm">{errors.fullName}</p>
                  )}
                </div>
                <div className="flex justify-between">
                  <div className="flex flex-col w-1/2 mr-3">
                    <label htmlFor="email">
                      Email <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="email"
                      type="text"
                      value={formData.email}
                      required={true}
                      onChange={handleInput}
                      className="border border-gray-300 shadow-sm rounded-lg focus:outline-none focus:border-gray-400 py-1 px-2"
                    ></input>
                    {errors.email && (
                      <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                  </div>
                  <div className="flex flex-col w-1/2">
                    <label htmlFor="phoneNumber">
                      Phone number <span className="text-red-600">*</span>{" "}
                    </label>
                    <input
                      id="phoneNumber"
                      type="text"
                      required={true}
                      value={formData.phoneNumber}
                      onChange={handleInput}
                      className="border border-gray-300 shadow-sm rounded-lg focus:outline-none focus:border-gray-400 py-1 px-2"
                    ></input>
                    {errors.phoneNumber && (
                      <p className="text-red-500 text-sm">
                        {errors.phoneNumber}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label htmlFor="coverLetter">
                    Cover Letter <span className="text-red-600">*</span>{" "}
                  </label>
                  <textarea
                    id="coverLetter"
                    rows={7}
                    cols={50}
                    required={true}
                    onChange={handleInput}
                    placeholder="Tell us why you're a good fit for this position..."
                    className=" w-full border border-gray-300 shadow-sm rounded-lg focus:outline-none focus:border-gray-400 py-1 px-2"
                  ></textarea>
                  {errors.coverLetter && (
                    <p className="text-red-500 text-sm">{errors.coverLetter}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="cv">CV </label>
                  <div className="border-2 border-gray-300 border-dashed rounded-lg p-4 flex flex-col items-center  text-gray-500">
                    <div className=" flex flex-col items-center mb-4 ">
                      <Upload />
                      <p>Drag and drop your cv here or click to browse</p>
                      <p>Pdf only (Max 5MB)</p>
                    </div>
                    <input
                      id="cv"
                      type="file"
                      accept=".pdf"
                      // onChange={handleInput}
                      className="hidden"
                    ></input>
                    <div className="w-25">
                      <Button
                        text={"Select File"}
                        onClick={() => document.getElementById("cv").click()}
                      ></Button>
                    </div>
                  </div>
                </div>

                <p className="text-gray-400">
                  You can upload your cv here or fill out our custom cv in the
                  <Link to={"/cv"} className="text-blue-400 mx-1">
                    account
                  </Link>{" "}
                  section.
                </p>
              </div>
              <div className="mt-6 flex justify-center gap-2">
                <div>
                  <Button
                    onClick={() => {}}
                    text="Cancle"
                    variant="dark"
                    disabled={isSubmitting}
                  ></Button>
                </div>
                <div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    text={
                      isSubmitting ? (
                        <span className="animate-spin">Submitting ⟳ </span>
                      ) : (
                        "Submit Application"
                      )
                    }
                  ></Button>
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

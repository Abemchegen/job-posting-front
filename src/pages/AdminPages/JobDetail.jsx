import JobCard from "../../components/AdminComponents/JobCard";

export default function JobDetail() {
  return (
    <div className="mt-15 flex justify-center">
      <div className="w-full max-w-2xl">
        <JobCard detail={true} />
      </div>
    </div>
  );
}

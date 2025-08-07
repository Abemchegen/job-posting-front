import CompanyApplicationCard from "../../components/CompanyComponents/CompanyApplicationCard";

export default function Application() {
  return (
    <div className="flex w-full mt-15 justify-center">
      <div className="flex flex-col items-center w-9/10">
        <CompanyApplicationCard />
        <CompanyApplicationCard />
        <CompanyApplicationCard />
        <CompanyApplicationCard />
        <CompanyApplicationCard />
        <CompanyApplicationCard />
        <CompanyApplicationCard />
      </div>
    </div>
  );
}

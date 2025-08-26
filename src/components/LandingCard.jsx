import { Search } from "lucide-react";

const LandingCard = ({ title = "", text = "" }) => {
  return (
    <div className="flex min-w-[182px] flex-col rounded-lg shadow-sm basis-1/3 p-5 bg-white">
      <Search className="w-8 mb-4 h-8 text-white p-1 bg-brand rounded-sm"></Search>
      <p className="text-xl mb-2">{title}</p>
      <p className="mb-2">{text}</p>
    </div>
  );
};

export default LandingCard;

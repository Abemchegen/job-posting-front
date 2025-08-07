import UserCard from "../../components/AdminComponents/UserCard";

export default function UserDetail() {
  return (
    <div className="flex justify-center mt-15">
      <div className="w-2/3 max-w-2xl">
        <UserCard detail={true} />
      </div>
    </div>
  );
}

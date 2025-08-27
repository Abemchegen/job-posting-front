import { useSearchParams } from "react-router-dom";
import UserCard from "../../components/AdminComponents/UserCard";
import { useAuth } from "../../context/authContext";
import { useEffect, useState } from "react";
import { Spinner } from "../../components/Spinner";

export default function UserDetail() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [user, setUser] = useState(null);
  const { getUser } = useAuth();
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        const response = await getUser(id);
        setUser(response);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [id, getUser]);
  return (
    <div className="flex justify-center mt-15">
      {loading && !user && (
        <div className="flex justify-center items-center m-5 space-x-5">
          <Spinner />
          <p className="text-xl font-semibold text-gray-500">Loading...</p>
        </div>
      )}
      {!loading && !user && (
        <div>
          <p> can't find user at the moment</p>
        </div>
      )}
      {user && (
        <div className="w-full flex justify-center">
          <UserCard detail={true} user={user} />
        </div>
      )}
    </div>
  );
}

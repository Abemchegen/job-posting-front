import MessageArea from "../components/MessageArea";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useEffect, useState } from "react";
import { useChats } from "../hook/useChat";

export default function Chats() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("reciever");
  const { getUsertoChat } = useChats();
  const [loading, setLoading] = useState(false);
  const [reciever, setReciever] = useState(null);

  useEffect(() => {
    async function fetchReciever() {
      try {
        setLoading(true);
        if (id) {
          const res = await getUsertoChat(id);
          setReciever(res);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
    fetchReciever();
  }, [id]);

  return (
    <div className="mt-15 flex justify-center w-full">
      {loading && <div>Loading...</div>}
      {!loading && <MessageArea reciever={reciever} />}
    </div>
  );
}

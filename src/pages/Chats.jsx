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
          const tempContacts =
            JSON.parse(localStorage.getItem("tempContacts")) || [];
          let exists = false;

          if (tempContacts.length > 0) {
            exists = tempContacts.some((c) => c.id === res.id);
          }
          if (!exists && res) {
            localStorage.setItem(
              "tempContacts",
              JSON.stringify([...tempContacts, res])
            );
          }
        }
      } catch (e) {
      } finally {
        setLoading(false);
      }
    }
    fetchReciever();
  }, [id]);

  return (
  <div className="mt-16 flex justify-center w-full">
      {loading && <div>Loading...</div>}
      {!loading && <MessageArea reciever={reciever} />}
    </div>
  );
}

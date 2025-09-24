import { Stomp } from "@stomp/stompjs";
import List from "@mui/material/List";
import React, { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import Button from "./Button";
import { useAuth } from "../context/authContext";
import { useChats } from "../hook/useChat";
import { useRef } from "react";
import ContactSidebar from "./ContactSidebar";
const MessageArea = ({ reciever }) => {
  const { user } = useAuth();
  const { Contacts, fetchChatHistory } = useChats();
  const [totalContacts, setTotalContacts] = useState([]);
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [chatMessages, setChatMessages] = useState({});
  const [stompClient, setStompClient] = useState(null);
  const [data, setData] = useState({
    senderName: "",
    recieverName: "",
    message: "",
    senderID: "",
    receiverID: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem("tempContacts");
    const tempContacts = stored
      ? JSON.parse(localStorage.getItem("tempContacts"))
      : [];
    let total = tempContacts;
    if (Contacts && Contacts.length > 0) {
      const merged = [
        ...Contacts,
        ...tempContacts.filter((tc) => !Contacts.some((c) => c.id === tc.id)),
      ];
      total = merged;
    }
    setTotalContacts(total);
  }, [Contacts]);

  useEffect(() => {
    if (user) {
      setData((prev) => ({
        ...prev,
        senderName: user.email,
        senderID: user.id,
        message: "",
      }));
    }
  }, [user]);
  useEffect(() => {
    if (reciever) {
      setData((prev) => ({
        ...prev,
        receiverID: reciever.id,
        recieverName: reciever.email,
      }));
      handleSelectChat(reciever.id);
      console.log(reciever);
    }
  }, [reciever]);

  const handleMessageChange = (e) => {
    setData({ ...data, message: e.target.value });
  };
  useEffect(() => {
    if (
      totalContacts &&
      totalContacts.length > 0 &&
      !selectedContactId &&
      reciever == null
    ) {
      handleSelectChat(totalContacts[0].id);
    }
  }, [totalContacts, reciever]);

  const handleSelectChat = (contactId) => {
    setSelectedContactId(contactId);
    const selectedContact = totalContacts.find(
      (contact) => contact.id === contactId
    );
    if (selectedContact) {
      setData((prev) => ({
        ...prev,
        receiverID: selectedContact.id,
        recieverName: selectedContact.email,
      }));
    }
    fetchHistory(contactId);
  };
  const fetchHistory = async (id) => {
    try {
      const response = await fetchChatHistory(id);
      console.log(response, "jhkjhkhkjh");
      setChatMessages((prev) => {
        return {
          ...prev,
          [id]: response,
        };
      });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    console.log("Updated chatMessages:", chatMessages, selectedContactId);
  }, [chatMessages, selectedContactId]);

  const sendMessage = () => {
    if (
      data.message.trim() &&
      data.senderName &&
      data.recieverName &&
      data.receiverID &&
      data.senderID &&
      stompClient &&
      stompClient.connected // <-- add this check
    ) {
      const chatMessage = {
        senderName: data.senderName,
        recieverName: data.recieverName,
        message: data.message,
        receiverID: data.receiverID,
        senderID: data.senderID,
      };
      console.log(chatMessage);
      stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
      setData({
        ...data,
        message: "",
      });
    }
  };

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ms");
    const client = Stomp.over(socket);
    client.connect({}, () => {
      client.subscribe("/user/" + user.email + "/private", (message) => {
        const recievedMessage = JSON.parse(message.body);
        console.log("Recieved messages", recievedMessage);
        setChatMessages((prev) => {
          const contactID =
            recievedMessage.senderID === user.id
              ? recievedMessage.receiverID
              : recievedMessage.senderID;
          return {
            ...prev,
            [contactID]: [...(prev[contactID] || []), recievedMessage],
          };
        });
      });
    });
    setStompClient(client);
    return () => {
      client.disconnect();
    };
  }, [user]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, selectedContactId]);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  function formatDate(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  return (
    <div className="h-full w-full flex flex-col space-y-2">
      <div className="w-full h-[calc(100vh-60px)] flex ">
        <div className={`${sidebarOpen ? "w-65" : "w-15"}`}>
          <ContactSidebar
            active={sidebarOpen}
            setActive={setSidebarOpen}
            contacts={totalContacts}
            selected={selectedContactId}
            handleSelectChat={handleSelectChat}
          />
        </div>
        <div className="flex-1 bg-white rounded flex flex-col justify-between">
          <div className="flex-1 overflow-y-auto">
            <List className="px-2">
              {(chatMessages[selectedContactId] || []).length === 0 && (
                <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                  <span className="text-4xl mb-2">💬</span>
                  <span className="font-semibold">No messages yet!</span>
                </div>
              )}
              {(chatMessages[selectedContactId] || []).map(
                (msg, index, arr) => {
                  const currentDate = new Date(msg.date);
                  const prevDate =
                    index > 0 ? new Date(arr[index - 1].date) : null;
                  const isNewDay =
                    !prevDate ||
                    currentDate.toDateString() !== prevDate.toDateString();

                  return (
                    <React.Fragment key={index}>
                      {isNewDay && (
                        <div className="flex justify-center my-2">
                          <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                            {currentDate.toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      )}
                      <ListItem>
                        <div
                          className={`flex ${
                            msg.senderID === data.senderID
                              ? "justify-end"
                              : "justify-start"
                          } w-full`}
                        >
                          <div
                            className={`max-w-[70%] break-words whitespace-pre-line border rounded-xl px-4 py-2 shadow transition-all mb-2 ${
                              msg.senderID === data.senderID
                                ? "bg-brand text-white"
                                : "bg-brand-dark text-white"
                            }`}
                          >
                            <Typography variant="body1">
                              {msg.message}
                            </Typography>
                            <Typography
                              variant="caption"
                              className="block text-xs text-gray-300 mt-1 text-right"
                            >
                              {formatDate(msg.date)}
                            </Typography>
                          </div>
                        </div>
                      </ListItem>
                    </React.Fragment>
                  );
                }
              )}
            </List>
            <div ref={messagesEndRef} />
          </div>
          <div className="flex rounded-t-sm bg-brand-dark items-center justify-center border">
            <input
              id="standard-basic"
              className="flex-1 border-2 m-3 bg-white rounded-2xl border-gray-200 px-2 py-1 focus:border-white outline-none"
              value={data.message}
              onKeyDown={(e) => {
                if (e.key === "Enter" && data.message.trim()) {
                  sendMessage();
                }
              }}
              onChange={handleMessageChange}
            />
            <div className="m-3">
              <Button
                text={"SEND"}
                onClick={sendMessage}
                disabled={!data.message.trim()}
              ></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageArea;

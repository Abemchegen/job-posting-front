import { Menu, MenuSquareIcon, User } from "lucide-react";
import CloudImage from "./CloudImage";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

export default function ContactSidebar({
  contacts,
  active,
  setActive,
  handleSelectChat,
  selected,
}) {
  return (
    <div className="w-full h-full">
      {active && (
        <div className="flex  w-full h-full flex-shrink-0 ">
          <div className="flex flex-col w-full bg-brand-dark h-full text-white p-4 rounded-tr-xl shadow-lg">
            <div className="flex justify-between space-x-5 mb-5">
              <p className="font-bold text-lg">Contacts</p>
              <button onClick={() => setActive(false)}>
                <Menu className="hover:cursor-pointer" />
              </button>
            </div>
            <List>
              {contacts &&
                contacts.map((Contact, index) => (
                  <ListItem
                    key={index}
                    onClick={() => handleSelectChat(Contact.id)}
                    className={`cursor-pointer items-center flex hover:bg-brand mb-3 rounded-sm ${
                      selected == Contact.id ? "bg-brand" : ""
                    }`}
                  >
                    <ListItemAvatar className="flex items-center space-x-4 text-white w-full">
                      {Contact.pfp ? (
                        <div className="w-10 justify-center flex flex-col items-center">
                          <CloudImage
                            className="rounded-full"
                            publicId={Contact.pfp}
                          />
                        </div>
                      ) : (
                        <User className="rounded-full w-10 h-10 text-brand bg-white p-1" />
                      )}
                      <ListItemText
                        primary={
                          <Typography variant="subtitle1" gutterBottom>
                            {Contact.name}
                          </Typography>
                        }
                      />
                    </ListItemAvatar>
                  </ListItem>
                ))}
            </List>
          </div>
        </div>
      )}
      {!active && (
        <div className="flex w-15 h-full flex-shrink-0">
          <div className="flex flex-col items-center w-full bg-brand-dark text-white p-2 rounded-tr-xl shadow-lg">
            <button onClick={() => setActive(true)} className="mt-2">
              <Menu className="hover:cursor-pointer" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

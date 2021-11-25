import React, { useState, useEffect, FC } from "react";
import { getStorageRef } from "../utils/firebase";

interface UserContext {
  images: string[],
  username: number | string,
}

const UserContext = React.createContext<UserContext>({
  images: [],
  username: "",
});

export const UserContextProvider: FC = (props) => {

  const [images, setImages] = useState<string[]>([]);
  const username = 1;

  const getFromFirebase = (userId: number) => {
    const storageRef = getStorageRef(userId);
    storageRef.listAll().then((res) => {
      res.items.forEach((imageRef) => {
        imageRef.getDownloadURL().then((url) => {
          setImages((images) => [...images, url]);
        });
      });
    });
  };

  useEffect(() => {
    getFromFirebase(username);
  }, []);

  const contextValue = {
    images,
    username,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;

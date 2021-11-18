import React, { useState, useEffect } from "react";
import { getStorageRef } from "../utils/firebase";

const UserContext = React.createContext({
  images: [],
  username: "",
});

export const UserContextProvider = (props) => {
  const [images, setImages] = useState<any>([]);
  const username = 1;

  const getFromFirebase = (userId) => {
    console.log('userId', userId)
    const storageRef = getStorageRef(userId);
    storageRef.listAll().then((res) => {
      console.log('res', res)
      res.items.forEach((imageRef) => {
        console.log('imageRef', imageRef)
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

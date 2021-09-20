import React, { useState, useEffect } from "react";

interface FirebaseImage {
  id: string;
  likes: number;
  url: string;
}

const UserContext = React.createContext({
  images: [] as FirebaseImage[],
  user: "",
  getUser: (email) => {},
});

export const UserContextProvider = (props) => {
  const [images, setImages] = useState<FirebaseImage[]>([]);
  const [user, setUser] = useState<string>();
  const username = 1; //fix this ///
  // const user = getUser();

  const getUser = (user: string) => {
    setUser(user);

    console.log("getuser", user);
  };

  const getFromFirebase = (user) => {
    // const storageRef = getStorageRef(userId);
    // storageRef.listAll().then((res) => {
    //   res.items.forEach((imageRef) => {
    //     imageRef.getDownloadURL().then((url) => {
    //       setImages((images) => [...images, url]);
    //     });
    //   });
    // });

    fetch(
      "https://aperture-479c6-default-rtdb.firebaseio.com/users/$user/images.json"
    )
      .then((response) => {
        console.log("response");
        return response.json();
      })
      .then((data) => {
        const images = [];

        for (const key in data) {
          const image = {
            id: key,
            ...data[key],
          };
          images.push(image);
        }
        setImages(images);
        console.log(images);
      });
  };

  useEffect(() => {
    getFromFirebase(user);
  }, []);

  const contextValue = {
    images,
    user,
    username,
    getUser,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;

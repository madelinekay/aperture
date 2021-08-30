import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState, useContext } from "react";
import { string } from "yup";
import resizeImage from "../utils/imageResizer";
import { useEffect } from "react";
import authContext from "../store/auth-context";
import { getStorageRef } from "../utils/firebase";
import { uploadBytes } from "firebase/storage";
import UserContext from "../store/user-context";

const Profile: NextPage = () => {
  const ctx = useContext(authContext);
  const { images, username } = useContext(UserContext);
  const userID = username.toString();
  console.log(images);

  const handleSelectedFile = (event: React.FormEvent) => {
    const file = event.target.files[0];
    const storageRef = getStorageRef(userID);

    const imageRef = storageRef.child(file.name);
    const metadata = {
      time: Date.now().toString(),
    };
    imageRef
      .put(file, { customMetadata: metadata })
      .then(() => console.log("uploaded", imageRef.name));

    // uploadBytes(storageRef, file, metadata);
  };

  return (
    <div>
      <div>Home</div>
      <input type="file" onChange={handleSelectedFile} />
      <div>
        {images.map((url) => (
          <img src={url} key={url} />
        ))}
      </div>
    </div>
  );
};

export default Profile;

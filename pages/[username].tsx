import { getFromFirebase, getStorageRef } from "../utils/firebase";
import { NextPage } from "next";
import UserContext from "../store/user-context";
import { useContext, useEffect } from "react";

const Home: NextPage = () => {
  const { images, username } = useContext(UserContext);

  return (
    <div>
      <div>Profile</div>
      <div>
        {images.map((url) => (
          <img src={url} key={url} />
        ))}
      </div>
    </div>
  );
};

export default Home;

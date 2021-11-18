import { getFromFirebase, getStorageRef } from "../utils/firebase";
import { NextPage } from "next";
import UserContext from "../store/user-context";
import { useContext, useEffect } from "react";
import Image from "next/image";
import { Hidden } from "@material-ui/core";

const Home: NextPage = () => {
  const { images, username } = useContext(UserContext);
  const padders = Array.from(Array(3 - (images.length % 3)));
  console.log("username", images);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: 1000,
        margin: "0 auto",
      }}
    >
      {/* <div>
        <div>Madeline</div>
        <div>0 followers</div>
        <div>0 following</div>
      </div> */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          marginLeft: 30,
          marginTop: 30,
        }}
      >
        {images.map((url) => (
          <div
            key={url}
            style={{



              display: "flex",
              justifyContent: "center",
              overflow: "hidden",
              width: 290,
              height: 290,
              marginRight: 30,
              marginBottom: 30,
              alignItems: "center",
            }}
          >
            <img
              src={url}
              /* align-items: center; */
              style={{ maxHeight: 600, maxWidth: 600 }}
            //check that this code is relevant
            />
          </div>
        ))}
        {padders.map((_, index) => (
          <div
            key={index}
            style={{
              maxWidth: 290,
              maxHeight: 290,
              overflow: "hidden",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;

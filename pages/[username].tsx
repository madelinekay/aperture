import UserContext from "../store/user-context";

import { NextPage } from "next";
import { useContext } from "react";

const Home: NextPage = () => {
  const { images, username } = useContext(UserContext);
  const padders = Array.from(Array(3 - (images.length % 3)));

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
              style={{ maxHeight: 600, maxWidth: 600 }}
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

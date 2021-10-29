import { NextPage } from "next";
import React, { useContext, useCallback } from "react";
import AuthContext from "../store/auth-context";
import { getStorageRef } from "../utils/firebase";
import UserContext from "../store/user-context";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import FaceIcon from "@material-ui/icons/Face";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import Dropzone, { useDropzone } from "react-dropzone";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { makeStyles } from "@material-ui/core";
import router from "next/router";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    marginLeft: theme.spacing(20),
    width: "100%",
  },
}));

const Profile: NextPage = () => {
  const authContext = useContext(AuthContext);
  console.log("authContext", authContext);
  const { images, user } = useContext(UserContext);
  console.log("myfeed user", user);
  // const userId = +usernamec

  const classes = useStyles();

  const handleSelectedFile = async (files) => {
    const file = files[0];
    const storageRef = getStorageRef(user);
    console.log("storageref", storageRef);
    console.log("file", file);

    const imageRef = storageRef.child(file.name);
    const metadata = {
      time: Date.now().toString(),
    };
    const image = await imageRef
      .put(file, { customMetadata: metadata })
      .then(() => console.log("uploaded", imageRef.name));
    const imageURL = await imageRef.getDownloadURL();

    fetch(
      "https://aperture-479c6-default-rtdb.firebaseio.com/users/$user/images.json",
      // "https://aperture-479c6-default-rtdb.firebaseio.com/images.json",
      {
        method: "POST",
        body: JSON.stringify({
          url: imageURL,
          likes: 0,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(() => {
      router.push("/my-feed");
    });
  };

  return (
    <div
      style={{
        display: "flex",
        maxWidth: 1000,
        margin: "0 auto",
        padding: 50,
        // borderStyle: "solid",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "0 auto",
          alignItems: "center",
          // borderStyle: "solid",
        }}
      >
        {images.map((image) => (
          <Card
            key={image.id}
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: 30,
            }}
          >
            <CardHeader
              avatar={<FaceIcon />}
              title="madelineundis"
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <img src={image.url} style={{ maxWidth: 600 }} />
            <CardContent
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="body1"
                  style={{
                    padding: 10,
                  }}
                >
                  madelineundis
                </Typography>
                <Typography variant="body2" color="black" component="p">
                  on vacation
                </Typography>
              </div>

              <div style={{ marginLeft: 250 }}>
                <IconButton
                  aria-label="add to favorites"
                  style={{ color: "black" }}
                >
                  <FavoriteBorderIcon />
                </IconButton>

                <IconButton aria-label="message" style={{ color: "black" }}>
                  <ChatBubbleOutlineIcon />
                </IconButton>
              </div>
            </CardContent>

            <CardActions>
              <IconButton style={{ color: "black" }}>
                <InsertEmoticonIcon />
              </IconButton>
              <InputBase
                placeholder="yorum ekle..."
                className={classes.search}
              />
              <Button style={{ opacity: 0.5 }}>Paylaş</Button>
            </CardActions>
          </Card>
        ))}
      </div>
      <div style={{ marginLeft: 30 }}>
        <div style={{ position: "sticky", top: 100 }}>
          <Card
            style={{
              marginBottom: 30,

              borderStyle: "dashed",
            }}
          >
            <Dropzone
              onDrop={(acceptedFiles) => handleSelectedFile(acceptedFiles)}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div
                    {...getRootProps()}
                    style={{
                      marginBottom: 30,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      padding: 20,
                    }}
                  >
                    <input {...getInputProps()} />
                    <p>Drag and drop an image here or click</p>
                    <CloudUploadIcon />
                  </div>
                </section>
              )}
            </Dropzone>
          </Card>
          <Card>
            <CardContent>
              <p>Senin İçin Öneriler</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;

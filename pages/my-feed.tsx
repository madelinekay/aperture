import { NextPage } from "next";
import React, { useContext, useCallback } from "react";
import authContext from "../store/auth-context";
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
import { FileCopyOutlined } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    marginLeft: theme.spacing(20),
    width: "100%",
  },
}));

const Profile: NextPage = () => {
  const ctx = useContext(authContext);
  const { images, username } = useContext(UserContext);
  const userId = +username;

  console.log(images);
  const classes = useStyles();

  // const handleSelectedFile = (event: React.FormEvent) => {
  //   const file = event.target.files[0];
  //   const storageRef = getStorageRef(userId);

  //   console.log(file);
  //   const imageRef = storageRef.child(file.name);
  //   const metadata = {
  //     time: Date.now().toString(),
  //   };
  //   imageRef
  //     .put(file, { customMetadata: metadata })
  //     .then(() => console.log("uploaded", imageRef.name));

  //   // uploadBytes(storageRef, file, metadata);
  // };

  const handleSelectedFile = (files) => {
    const file = files[0];
    const storageRef = getStorageRef(userId);
    console.log("storageref", storageRef);
    console.log("file", file);

    const imageRef = storageRef.child(file.name);
    const metadata = {
      time: Date.now().toString(),
    };
    imageRef
      .put(file, { customMetadata: metadata })
      .then(() => console.log("uploaded", imageRef.name));

    // uploadBytes(storageRef, file, metadata);
  };

  // function MyDropzone() {
  //   const onDrop = useCallback((event: React.FormEvent) => {
  //     const file = event.target.files[0];
  //     const storageRef = getStorageRef(userID);

  //     const imageRef = storageRef.child(file.name);
  //     const metadata = {
  //       time: Date.now().toString(),
  //     };
  //     imageRef
  //       .put(file, { customMetadata: metadata })
  //       .then(() => console.log("uploaded", imageRef.name));
  //   }, []);
  //   const { getRootProps, getInputProps, isDragActive } = useDropzone({
  //     onDrop,
  //   });

  //   return (
  //     <div {...getRootProps()}>
  //       <input {...getInputProps()} />
  //       {isDragActive ? (
  //         <p>Drop the files here ...</p>
  //       ) : (
  //         <p>Drag 'n' drop some files here, or click to select files</p>
  //       )}
  //     </div>
  //   );
  // }

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
        {images.map((url) => (
          <Card
            key={url}
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
            <img src={url} style={{ maxWidth: 600 }} />
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
            {/* <InputBase type="file" onChange={handleSelectedFile} /> */}
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

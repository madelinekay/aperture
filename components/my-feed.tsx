import UserContext from "../store/user-context";
import { getStorageRef } from "../utils/firebase";

import React, { useContext, FC } from "react";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import FaceIcon from "@material-ui/icons/Face";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Dropzone from "react-dropzone";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { makeStyles, Card, CardHeader, CardContent, CardActions, IconButton, Typography, InputBase, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    marginLeft: theme.spacing(20),
    width: "100%",
  },
}));

const Profile: FC = () => {
  const { images, username } = useContext(UserContext);
  const userId = +username;

  const classes = useStyles();

  const handleSelectedFile = (files: File[]) => {

    const storageRef = getStorageRef(userId);
    files.forEach(file => {
      const imageRef = storageRef.child(file.name);
      const metadata = {
        time: Date.now().toString(),
      };
      return imageRef
        .put(file, { customMetadata: metadata })
    })
  };

  return (
    <div
      style={{
        display: "flex",
        maxWidth: 1000,
        margin: "0 auto",
        padding: 50,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "0 auto",
          alignItems: "center",
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
                placeholder="Comment..."
                className={classes.search}
              />
              <Button style={{ opacity: 0.5 }}>Share</Button>
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
            {/* <CardContent>
              <p>Suggestions for you</p>
            </CardContent> */}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;

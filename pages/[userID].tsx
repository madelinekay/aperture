import { NextPage } from "next";
import getStorageRef from "../utils/firebase";
import { useRouter } from "next/router";
import { useState } from "react";
import { string } from "yup";

const Profile = () => {
  const [images, setImages] = useState<any>([]);
  const myUserId = 1;
  const storageRef = getStorageRef(1);
  const router = useRouter();

  const getFromFirebase = () => {
    storageRef.listAll().then((res) => {
      console.log("res", res);
      res.items.forEach((imageRef) => {
        imageRef.getDownloadURL().then((url) => {
          console.log(url);
          setImages((images) => [...images, url]);
        });
      });
    });
  };

  // getFromFirebase();

  const handleSelectedFile = (event: React.FormEvent) => {
    const file = event.target.files[0];
    // const storageRef = firebase.storage().ref(file.name);
    console.log(event, event.target.files[0]);

    // const { userId } = router.query;
    // eval(
    //   "const" + userId + "Ref" + Date.now() + "=" + storageRef.child(file)
    // );
    const imageRef = storageRef.child(file.name);
    imageRef.put(file).then(() => console.log("uploaded"));

    // function progress(snapshot) {
    //   var percentage = snapshot.bytesTransferred;
    // }
    // function error(err) {}
    // function complete() {}
  };
  return (
    <div>
      <div>Profile</div>
      <input type="file" onChange={handleSelectedFile} />
      <div></div>
    </div>
  );
};

export default Profile;

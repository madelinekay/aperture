import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

import { useFormik } from "formik";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import * as yup from "yup";
import Link from "next/link";
import { useState, useContext } from "react";
import { useRouter } from "next/router";
import AuthContext from "../store/auth-context";

const useStyles = makeStyles({
  button: {
    width: "100%",
  },
});

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const Home: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const ctx = useContext(AuthContext);

  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("log in");
      const enteredEmail = values.email;
      const enteredPassword = values.password;
      setIsLoading(true);

      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB8ONxO_Vjxt1HO8DKeoqcsV8ExTUsqof4",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          setIsLoading(false);

          if (res.ok) {
            console.log("res ok");
            return res.json();
          } else {
            return res.json().then((data) => {
              let errorMessage = "Authentication failed";
              if (data.error.message) {
                errorMessage = data.error.message;
              }
              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          const expirationTime = new Date(
            new Date().getTime() + +data.expiresIn * 1000
          ).getTime();

          ctx.login(data.idToken, expirationTime);
          router.push("/my-feed");
        })
        .catch((err) => {
          alert(err.message);
        });
    },
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Aperture</title>
        <meta
          name="description"
          content="Share photos with family &amp; friends instantly, send likes back "
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <form onSubmit={formik.handleSubmit}>
        <h1>Aperture</h1>
        <div>
          <TextField
            id="email"
            name="email"
            placeholder="Email, phone number or username"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </div>
        <div>
          <TextField
            id="password"
            name="password"
            placeholder="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </div>
        <div>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            type="submit"
          >
            Log In
          </Button>
        </div>
      </form>
      <div>
        Don't have an account yet? <Link href="/signup">Sign up</Link>
      </div>
    </div>
  );
};

export default Home;

// <!-- The core Firebase JS SDK is always required and must be listed first -->
{
  /* <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-analytics.js"></script>

<script>
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyB8ONxO_Vjxt1HO8DKeoqcsV8ExTUsqof4",
    authDomain: "aperture-479c6.firebaseapp.com",
    databaseURL: "https://aperture-479c6-default-rtdb.firebaseio.com",
    projectId: "aperture-479c6",
    storageBucket: "aperture-479c6.appspot.com",
    messagingSenderId: "407719756458",
    appId: "1:407719756458:web:4421b56d4a0d2168fbc6d3",
    measurementId: "G-JRQ46M1TP5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
</script> */
}

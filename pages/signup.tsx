import { NextPage } from "next";
import TextField from "@material-ui/core/TextField";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
import { useState, useContext } from "react";
import { useRouter } from "next/router";
import AuthContext from "../store/auth-context";
import signup from "./api/signup";

const useStyles = makeStyles({
  button: {
    width: "100%",
  },
});

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email or mobile number")
    .required("Email is required"),
  username: yup.string().required("Username is required").max(16),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const Signup: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();
  const router = useRouter();
  const ctx = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      const enteredEmail = values.email;
      const enteredUsername = values.username;
      const enteredPassword = values.password;
      setIsLoading(true);

      await signup(values.email, values.username);

      fetch(
        "https://complete-walkthrough-default-rtdb.firebaseio.com/meetups.json",
        {
          method: "POST",
          body: JSON.stringify(meetupData),
          headers: {
            "Content-Type": "application/json",
          },
        }

        
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB8ONxO_Vjxt1HO8DKeoqcsV8ExTUsqof4",
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
    <div>
      <form onSubmit={formik.handleSubmit}>
        <h1>Aperture</h1>
        <div>
          <TextField
            id="email"
            name="email"
            placeholder="Email or phone number"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </div>
        <div>
          <TextField
            id="username"
            name="username"
            placeholder="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
        </div>
        <div>
          <TextField
            id="password"
            name="password"
            placeholder="password"
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
            Sign Up
          </Button>
        </div>
      </form>
      <div>
        Already have an account? <Link href="/">Log in</Link>
      </div>
    </div>
  );
};

export default Signup;

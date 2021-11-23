import AuthContext from "../store/auth-context";

import { NextPage } from "next";
import { useFormik } from "formik";
import * as yup from "yup";
import Link from "next/link";
import { useState, useContext } from "react";
import { useRouter } from "next/router";
import signup from "./api/signup";
import { CardContent, Card, CardHeader, makeStyles, Button, TextField } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    width: 350,
    height: 400,
    border: "black",
    alignItems: "center",
    marginBottom: 50,
  },
  signup: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 350,
    height: 75,
  },
  button: {
    width: "100%",
    backgroundColor: "black",
  },
  textField: {
    marginBottom: 20,
    width: "100%",
    fontSize: 8,
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

  const auth = (email: string, password: string) => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB8ONxO_Vjxt1HO8DKeoqcsV8ExTUsqof4",
      {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
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
  };

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

      const signupData = await signup(values.email, values.username);

      const storageData = await fetch(
        "https://aperture-479c6-default-rtdb.firebaseio.com/users.json",
        {
          method: "POST",
          body: JSON.stringify({
            user: enteredEmail,
            username: enteredUsername,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const authData = await auth(enteredEmail, enteredPassword);
    },
  });

  return (
    <div className={classes.root}>
      <Card className={classes.container}>
        <CardHeader title="Aperture" style={{ marginBottom: 30 }} />
        <CardContent style={{ width: "85%" }}>
          <form onSubmit={formik.handleSubmit}>
            <div>
              <TextField
                className={classes.textField}
                variant="filled"
                size="small"
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
                className={classes.textField}
                variant="filled"
                size="small"
                id="username"
                name="username"
                placeholder="Username"
                value={formik.values.username}
                onChange={formik.handleChange}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
              />
            </div>
            <div>
              <TextField
                className={classes.textField}
                variant="filled"
                size="small"
                id="password"
                name="password"
                placeholder="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
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
        </CardContent>
      </Card>
      <Card className={classes.signup}>
        <CardContent>
          <div>
            Already have an account? <Link href="/">Log in</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;

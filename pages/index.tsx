import AuthContext from "../store/auth-context";
import Feed from "../components/my-feed";

import type { NextPage } from "next";
import Head from "next/head";
import { useFormik } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import * as yup from "yup";
import Link from "next/link";
import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { CardContent, Button, TextField, Card, CardHeader, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
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
    backgroundColor: theme.palette.primary.main,
  },
  textField: {
    marginBottom: 20,
    width: "100%",
    fontSize: 8,
  },
}));

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

  const { isLoggedIn, login } = useContext(AuthContext);

  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
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
          login(data.idToken, expirationTime);
        })
        .catch((err) => {
          alert(err.message);
        });
    },
  });

  return (
    <>
      {isLoggedIn ? <Feed /> : <>
        <Head>
          <title>Aperture</title>
          <meta
            name="description"
            content="Share photos with family &amp; friends instantly, send likes back "
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={classes.root}>
          <Card className={classes.container}>
            <CardHeader title="Aperture" style={{ marginBottom: 30 }} />
            <CardContent style={{ width: "85%" }}>
              <form onSubmit={formik.handleSubmit}>
                <div>
                  <TextField
                    className={classes.textField}
                    id="email"
                    name="email"
                    variant="filled"
                    size="small"
                    placeholder="Email"
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
                    id="password"
                    name="password"
                    placeholder="Password"
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
                    Log In
                  </Button>
                </div>
              </form>
            </CardContent>
            <CardContent>
              <div>Forgot password?</div>
            </CardContent>
          </Card>
          <Card className={classes.signup}>
            <CardContent>
              <div>
                Don't have an account yet? <Link href="/signup">Sign up</Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </>}

    </>
  );
};

export default Home;

import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

import { Formik, Form, useFormik } from "formik";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import * as yup from "yup";

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
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      account: "foobar@example.com",
      password: "foobar",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
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
        <div>
          <TextField
            id="account"
            name="account"
            placeholder="Phone number, username, or email"
            value={formik.values.account}
            onChange={formik.handleChange}
            error={formik.touched.account && Boolean(formik.errors.account)}
            helperText={formik.touched.account && formik.errors.account}
          />
        </div>
        <div>
          <TextField
            id="password"
            name="password"
            type="password"
            placeholder="Password"
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
    </div>
  );
};

export default Home;

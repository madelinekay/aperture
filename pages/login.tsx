import { Formik, Form, Field } from "formik";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const login: React.FC = () => {
  return (
    <div>
      <h1>Aperture</h1>
      <Formik
        initialValues={{
          account: "Phone number, username, or email",
          password: "Password",
        }}
        onSubmit={async (values: string) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        <Form>
          <Field
            id="account"
            name="account"
            placeholder="Phone number, username, or email"
          />
          <Field id="password" name="password" placeholder="Password" />
          <Button color="primary">Log In</Button>
        </Form>
      </Formik>
    </div>
  );
};

export default login;

import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminsignin, signSelector } from "../Reducer/reducer/signin.redu";
import { ToastContainer } from "react-toastify";
const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {ADMINSIGIN_DATA,ADMINSIGIN_STATUS} = useSelector(signSelector);
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email format").required(),
    password: Yup.string().required(),
  });

  useEffect(()=>{
    if(ADMINSIGIN_DATA?.data?.message == "Logged in Successfully"){
      navigate("/dashboard/profile")
    }
    console.log(ADMINSIGIN_DATA,'sdcd')
  })
  return (
    <div className="sign-container">
      <ToastContainer/>
      <div>
        <Link to={"/"}>Admin login /</Link>
        <Link to={"/employe_signin"}>Employee login</Link>
      </div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(value) => {
          console.log(value, "valuesFromFormik");
          dispatch(adminsignin(value));
        }}
      >
        {() => (
          <Form noValidate={" "} className="form-container">
            <div className="form-head">
              <h4>Admin Login</h4>  
              <p>Welcome to ELMS</p>
            </div>
            <div className="from-inputs">
              <label htmlFor="email">email:</label>
              <Field
                name="email"
                type="email"
                placeholder="Enter a registered email"
              />
              <ErrorMessage
                name="email"
                component={"div"}
                className="form-errors"
              />
            </div>
            <br />
            <div className="from-inputs">
              <label htmlFor="password">Password:</label>
              <Field
                name="password"
                type="password"
                placeholder="Enter a password"
                autoComplete="new-password"
              />
              <ErrorMessage
                name="password"
                component={"div"}
                className="form-errors"
              />
            </div>
            <br />
            <button type="submit" className="form-submit">
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signin;

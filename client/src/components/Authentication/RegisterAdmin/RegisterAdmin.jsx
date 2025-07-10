import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import useAuthStore from "../../../store/auth";
import toast from "react-simple-toasts";
import "react-simple-toasts/dist/theme/dark.css";
import "../Register/register.css";

const RegisterAdmin = () => {
  const navigate = useNavigate();
  const registerAdmin = useAuthStore((state) => state.registerAdmin);

  const initialValues = {
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validate = (values) => {
    const errors = {};
    if (!values.fullName) {
      errors.fullName = "Full Name is required";
    }
    if (!values.phoneNumber) {
      errors.phoneNumber = "Phone Number is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    } else if (!values.email.endsWith("@wbt.com")) {
      errors.email = "Admin email must end with @wbt.com";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords must match";
    }
    return errors;
  };

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await registerAdmin(
        {
          fullName: values.fullName,
          phoneNumber: values.phoneNumber,
          email: values.email,
          password: values.password,
          role: "admin",
        },
        navigate
      );
      toast("Admin registered successfully", {
        theme: "dark",
        type: "success",
      });
    } catch (err) {
      setErrors({ submit: "Registration failed" });
      toast("Registration failed", { theme: "dark", type: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="sign-up-form">
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <h2>Admin Sign Up</h2>
            {errors.submit && <p>{errors.submit}</p>}
            <div className="sign-up-email-password">
              <Field type="text" name="fullName" placeholder="Full Name" />
              <ErrorMessage name="fullName" component="div" className="form-error" />
              <Field type="tel" name="phoneNumber" placeholder="Phone Number" />
              <ErrorMessage name="phoneNumber" component="div" className="form-error" />
              <Field type="email" name="email" placeholder="Admin Email (@wbt.com)" />
              <ErrorMessage name="email" component="div" className="form-error" />
              <Field type="password" name="password" placeholder="Password" />
              <ErrorMessage name="password" component="div" className="form-error" />
              <Field type="password" name="confirmPassword" placeholder="Confirm Password" />
              <ErrorMessage name="confirmPassword" component="div" className="form-error" />
            </div>
            <div className="sign-up-submit-btn">
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Registering..." : "Sign Up as Admin"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterAdmin; 
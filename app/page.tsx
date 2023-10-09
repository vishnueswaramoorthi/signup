"use client";
import { Formik, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("auth");
    if (isAuthenticated) {
      // Redirect to the dashboard page if authenticated
      router.push("/loggedin");
    }
  }, []);

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username is required")
      .matches(/^[a-zA-Z]+$/, "Username must contain only letters."),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
        "Password must contain at least one letter and one number"
      ),
  });

  const initialValues = {
    username: "",
    password: "",
  };

  const onSubmit = (values: any) => {
    if (!values.username || !values.password) {
      alert("Please fill all fields.");
      return;
    }
    const validationErrors = validationSchema.validateSync(values, {
      abortEarly: false,
    });

    // if (validationErrors && validationErrors.length > 0) {
    //   alert("Please fix validation errors.");
    //   return;
    // }
    // Rest of the validation and submission logic
    console.log("Form data:", values);
    const token = uuidv4(); // Example: Generating a UUID as a token

    // Store the token in localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("auth", "true");

    router.push("/loggedin");
  };

  return (
    <div className="bg-gradient-to-tl from-neutral-900 via-gray-900 to-neutral-500 flex flex-col h-screen justify-center items-center">
      <div className="p-10">
        <div className="block text-white text-150 font-bold mb-2 text-center ">
          Sign in
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched, values }) => (
            <form>
              <div className="mb-4">
                <label className="block text-white text-150 font-bold mb-2">
                  Username
                </label>
                <Field
                  type="text"
                  id="username"
                  name="username"
                  value={values.username}
                  className={`shadow appearance-none border rounded w-50 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.username && touched.username ? "border-red-500" : ""
                  }`}
                  placeholder="Enter your username"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>
              <div className="mb-4">
                <label className="block text-white text-150 font-bold mb-2">
                  Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  value={values.password}
                  className={`shadow appearance-none border rounded w-50 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.password && touched.password ? "border-red-500" : ""
                  }`}
                  placeholder="Enter your password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>
              <button
                className="relative overflow-hidden bg-blue-500 text-white font-bold py-2 px-4 rounded"
                type="button" // Use type="button" to prevent form submission
                onClick={() => {
                  onSubmit(values); // Call onSubmit directly
                }}
              >
                Sign In
                <span className="absolute h-full w-full bg-gradient-to-r from-white via-white to-transparent opacity-0 top-0 left-0 hover-animation"></span>
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

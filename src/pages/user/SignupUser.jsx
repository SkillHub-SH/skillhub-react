import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

const SignupUser = () => {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      ConfirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().min(8, "Must be 8 characters or more").required("Required"),
      ConfirmPassword: Yup.string().min(8, "Must be 8 characters or more").required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        await handleSubmit(values);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleSubmit = (values) => {
    setDisabled(true);
    axios
      .post("/developers", {
        developer: {
          username: values.username,
          email: values.email,
          password: values.password,
          password_confirmation: values.ConfirmPassword,
        } 
      })
      .then((response) => {
        toast.success("Sign Up Successfully");
        navigate("/signin");
        setDisabled(false);
      })
      .catch((err) => {
        toast.error("Your Data Invalid");
        setDisabled(false);
      });
  };

  return ( 
    <div className="flex flex-col items-center py-4">
      <div className="flex items-center mb-4">
        <h1 className="text-gray-600 text-3xl font-bold">
          SkillHub
        </h1>
        <span className="w-4 h-6 ml-1 bg-green-600 block"></span>
      </div>

      <h2 className='text-gray-600 font-bold text-xl mb-1'>
        Sign Up For Developers
      </h2>

      <p className='text-sm text-gray-500 mb-4'>
        Practice coding, prepare for interviews, and get hired.
      </p>

      <form
        className="flex w-96 flex-col gap-4 rounded-lg border border-slate-300 p-8 pt-4 shadow-sm"
        onSubmit={formik.handleSubmit}
      >
        <div className="w-full">
          <label 
            className="block text-sm font-medium text-gray-600" 
            htmlFor="username"
          >
            User Name
          </label>
          <input
            className=" block w-full rounded-lg border p-2.5 text-sm  focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50"
            type="text"
            id="username"
            placeholder="John Doe"
            onChange={formik.handleChange}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="text-red-500">
              {formik.errors.username}
            </div>
          ) : null}
        </div>
        <div className="w-full">
          <label 
            className="block text-sm font-medium text-gray-600" 
            htmlFor="email"
          >
            E-mail
          </label>
          <input
            className=" block w-full rounded-lg border p-2.5 text-sm  focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50"
            type="email"
            id="email"
            placeholder="example@gmail.com"
            onChange={formik.handleChange}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500">
              {formik.errors.email}
            </div>
          ) : null}
        </div>
        <div className="w-full">
          <label 
            className="block text-sm font-medium text-gray-600" 
            htmlFor="password"
          >
            Password
          </label>
          <input
          className=" block w-full rounded-lg border p-2.5 text-sm  focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50"
            type="password"
            id="password"
            placeholder="***********"
            onChange={formik.handleChange}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500">
              {formik.errors.password}
            </div>
          ) : null}
        </div>
        <div className="w-full">
          <label 
            className="block text-sm font-medium text-gray-600" 
            htmlFor="ConfirmPassword"
          >
            Confirm Password
          </label>
          <input
            className=" block w-full rounded-lg border p-2.5 text-sm  focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50"
            type="password"
            id="ConfirmPassword"
            placeholder="***********"
            onChange={formik.handleChange}
          />
          {formik.touched.ConfirmPassword && formik.errors.ConfirmPassword ? (
            <div className="text-red-500">
              {formik.errors.ConfirmPassword}
            </div>
          ) : null}
        </div>
        <p className="text-sm">
          have an account?{" "}
          <a className="text-green-600 text-lg underline" href="signin">
            Sign In
          </a>
        </p>
        <button 
          className='text-white bg-green-600 font-simibold text-xl py-2 px-6 mt-2 rounded hover:bg-green-400 focus:outline-none disabled:focus:ring-none  disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-none'
          type="submit"
          disabled={disabled}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
 
export default SignupUser;
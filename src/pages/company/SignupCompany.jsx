import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

const SignupCompany = () => {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().min(8, "Must be 8 characters or more").required("Required"),
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
      .post("/companies", {
        company: {
          name: values.name,
          email: values.email,
          password: values.password,
        }
      })
      .then((response) => {
        toast.success("Sign Up Successfully");
        navigate("/signin-company");
        setDisabled(false);
      })
      .catch((err) => {
        toast.error("Email already exist");
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
        Sign Up For Companies
      </h2>

      <p className='text-sm text-gray-500 mb-4'>
        Market-leading techniacal interview platform to identify and hire developers.
      </p>

      <form
        className="flex w-96 flex-col gap-4 rounded-lg border border-slate-300 p-8 pt-4 shadow-sm"
        onSubmit={formik.handleSubmit}
      >
        <div className="w-full">
          <label 
            className="block text-sm font-medium text-gray-600" 
            htmlFor="name"
          >
            Company Name
          </label>
          <input
            className=" block w-full rounded-lg border p-2.5 text-sm  focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50"
            type="name"
            id="name"
            placeholder="SkillHub Company"
            onChange={formik.handleChange}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-500">
              {formik.errors.name}
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
        <p className="text-sm">
          have an account?{" "}
          <a className="text-green-600 text-lg underline" href="signin-company">
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
 
export default SignupCompany;
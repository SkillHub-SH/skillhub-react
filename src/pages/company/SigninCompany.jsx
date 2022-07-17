import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { authState } from "../../recoil";
import { useSetRecoilState } from "recoil";

const SigninCompany = () => {
  const setToken = useSetRecoilState(authState);
  const [disabled, setDisabled] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
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
      .post("/companies/sign_in", {
        company: {
          email: values.email,
          password: values.password,
        }
      })
      .then((response) => {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setDisabled(false);
      })
      .catch((err) => {
        toast.error("Your Credentials are wrong");
        setDisabled(false);
      });
  };

  return ( 
    <div className="flex flex-col items-center py-4 mt-10">
      <div className="flex items-center mb-4">
        <h1 className="text-gray-600 text-3xl font-bold">
          SkillHub
        </h1>
        <span className="w-4 h-6 ml-1 bg-green-600 block"></span>
      </div>

      <h2 className='text-gray-600 font-bold text-xl mb-6'>
        Sign In For Companies
      </h2>

      <form
        className="flex w-96 flex-col gap-4 rounded-lg border border-slate-300 p-8 pt-4 shadow-sm"
        onSubmit={formik.handleSubmit}
      >
        <div className="w-full mt-2">
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
        <button 
          className='text-white bg-green-600 font-simibold text-xl py-2 px-6 mt-2 rounded hover:bg-green-400 focus:outline-none disabled:focus:ring-none  disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-none'
          type="submit"
          disabled={disabled}
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
 
export default SigninCompany;
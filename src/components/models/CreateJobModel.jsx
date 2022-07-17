import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { Modal } from "./Base";
import  useToggleModal  from "../../hooks/useToggleModel";
import { authState } from "../../recoil";
import { useRecoilValue } from "recoil";
import { decodeToken } from "react-jwt";

const CreateJobModel = () => {
  const [token, setDecodeToken] = useState("");
  const authToken = useRecoilValue(authState);
  const [isOpen, toggleModal] = useToggleModal();
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (authToken) {
      const decode = decodeToken(authToken);
      setDecodeToken(decode);
    }
  }, [authToken]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      requirements: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
      requirements: Yup.string().required("Required"),
    }),
    enableReinitialize: true,
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
      .post("/api/v1/companies/jobs", {
        title: values.title,
        description: values.description,
        requirements: values.requirements,
        company_id: token.id,
      })
      .then((response) => {
        toggleModal();
        document.location.reload(true);
        toast.success("Job Added Successfully");
        setDisabled(false);
      })
      .catch((err) => {
        toast.error("Failed to Create Job");
        setDisabled(false);
      });
  };


  return (  
    <div>
      <button 
        className="text-green-600 bg-white border-solid border-2 border-green-600 font-semibold px-2 py-1 rounded hover:text-green-400 hover:border-green-400 focus:outline-none flex items-center gap-2 text-sm"
        onClick={toggleModal}
      >
        <FaPlus /> Create Job
      </button>

      <Modal title="Create Job" isOpen={isOpen} handleClose={toggleModal}>
        <div className="my-5">
          <form className="flex flex-col gap-4">

            <div className="w-full mt-2">
              <label 
                className="block text-sm font-medium text-gray-600" 
                htmlFor="title"
              >
                Job Title
              </label>
              <input
                className=" block w-full rounded-lg border p-2.5 text-sm  focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
                type="text"
                id="title"
                placeholder="Job Title"
                onChange={formik.handleChange}
              />
              {formik.touched.title && formik.errors.title ? (
                <div className="text-red-500 ml-4">
                  {formik.errors.title}
                </div>
              ) : null}
            </div>

            <div className="w-full mt-2">
              <label 
                className="block text-sm font-medium text-gray-600" 
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                className=" block w-full rounded-lg border p-2.5 text-sm  focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
                type="text"
                id="description"
                placeholder="Job Description"
                onChange={formik.handleChange}
              />
              {formik.touched.description && formik.errors.description ? (
                <div className="text-red-500 ml-4">
                  {formik.errors.description}
                </div>
              ) : null}
            </div>

            <div className="w-full mt-2">
              <label 
                className="block text-sm font-medium text-gray-600" 
                htmlFor="requirements"
              >
                Requirements
              </label>
              <textarea
                className=" block w-full rounded-lg border p-2.5 text-sm  focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
                id="requirements"
                placeholder="Job Requirements"
                onChange={formik.handleChange}
              />
              {formik.touched.requirements && formik.errors.requirements ? (
                <div className="text-red-500 ml-4">
                  {formik.errors.requirements}
                </div>
              ) : null}
            </div>
            
          </form>
        </div>
        <div className="flex flex-row-reverse gap-3">
          <button 
            className="text-green-600 bg-white border-solid border-2 border-green-600 font-semibold px-2 py-1 rounded hover:text-green-400 hover:border-green-400 focus:outline-none"
            type="submit" 
            onClick={() => formik.handleSubmit()} 
            disabled={disabled}
          >
            Create
          </button>
          <button 
            className="text-red-500 bg-white border-solid border-2 border-red-600 font-semibold px-2 py-1 rounded hover:text-red-300 hover:border-red-300 focus:outline-none"
            type="submit" 
            onClick={toggleModal}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}
 
export default CreateJobModel;
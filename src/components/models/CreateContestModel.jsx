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

const CreateContestModel = () => {
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
      name: "",
      description: "",
      level: "",
      start_at: new Date().toISOString().split("T")[0],
      end_at: new Date().toISOString().split("T")[0],
      company_id: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
      level: Yup.string().required("Required"),
      start_at: Yup.date().default(function () {
        return new Date();
      }),
      end_at: Yup.date().required("Required"),
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
      .post("/api/v1/companies/contests", {
        name: values.name,
        description: values.description,
        level: values.level,
        start_at: values.start_at,
        end_at: values.end_at,
        company_id: token.id,
      })
      .then((response) => {
        toggleModal();
        document.location.reload(true);
        toast.success("Contest Added Successfully");
        setDisabled(false);
      })
      .catch((err) => {
        toast.error("Failed to Create Contest");
        setDisabled(false);
      });
  };

  return ( 
    <div>
      <button 
        className="text-green-600 bg-white border-solid border-2 border-green-600 font-semibold px-2 py-1 rounded hover:text-green-400 hover:border-green-400 focus:outline-none flex items-center gap-2 text-sm"
        onClick={toggleModal}
      >
        <FaPlus /> Create Contest
      </button>

      <Modal title="Create Contest" isOpen={isOpen} handleClose={toggleModal}>
        <div className="my-5">
          <form className="flex flex-col gap-4">

            <div className="w-full mt-2">
              <label 
                className="block text-sm font-medium text-gray-600" 
                htmlFor="name"
              >
                Name
              </label>
              <input
                className=" block w-full rounded-lg border p-2.5 text-sm  focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
                type="text"
                id="name"
                placeholder="Contest Name"
                onChange={formik.handleChange}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-500 ml-4">
                  {formik.errors.name}
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
              <input
                className=" block w-full rounded-lg border p-2.5 text-sm  focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
                type="text"
                id="description"
                placeholder="Contest Description"
                onChange={formik.handleChange}
              />
              {formik.touched.description && formik.errors.description ? (
                <div className="text-red-500 ml-4">
                  {formik.errors.description}
                </div>
              ) : null}
            </div>

            <div>
              <label className='font-semibold text-gray-600 mr-1'>Level</label>
              <select
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-600 focus:border-green-500 focus:ring-green-500 focus:outline-none'
                name="level"
                required
                value={formik.values.level}
                onChange={(e) => {
                  formik.setFieldValue("level", e.target.value);
                }}
              >
                <option value="Junior">Junior</option>
                <option value="Mid">Mid</option>
                <option value="Senior">Senior</option>
              </select>
              {formik.touched.level && formik.errors.level ? (
                <div className="text-red-500 ml-4">
                  {formik.errors.level}
                </div>
              ) : null}
            </div>

            <div className="w-full mt-2">
              <label 
                className="block text-sm font-medium text-gray-600" 
                htmlFor="start_at"
              >
                Start Time
              </label>
              <input
                className=" block w-full rounded-lg border p-2.5 text-sm  focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
                type="datetime-local"
                id="start_at"
                placeholder="Start Time"
                onChange={formik.handleChange}
              />
              {formik.touched.start_at && formik.errors.start_at ? (
                <div className="text-red-500 ml-4">
                  {formik.errors.start_at}
                </div>
              ) : null}
            </div>

            <div className="w-full my-2">
              <label 
                className="block text-sm font-medium text-gray-600" 
                htmlFor="end_at"
              >
                End Time
              </label>
              <input
                className=" block w-full rounded-lg border p-2.5 text-sm  focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
                type="datetime-local"
                id="end_at"
                placeholder="End Time"
                onChange={formik.handleChange}
              />
              {formik.touched.end_at && formik.errors.end_at ? (
                <div className="text-red-500 ml-4">
                  {formik.errors.end_at}
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
 
export default CreateContestModel;
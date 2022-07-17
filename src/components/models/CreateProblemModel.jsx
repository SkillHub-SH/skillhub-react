import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { Modal } from "./Base";
import  useToggleModal  from "../../hooks/useToggleModel";
import { authState } from "../../recoil";
import { useRecoilValue } from "recoil";
import { decodeToken } from "react-jwt";

const CreateProblem = ({contest_id}) => {
  const [token, setDecodeToken] = useState("");
  const authToken = useRecoilValue(authState);
  const [isOpen, toggleModal] = useToggleModal();
  const [disabled, setDisabled] = useState(false);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    if (authToken) {
      const decode = decodeToken(authToken);
      setDecodeToken(decode);
    }
  }, [authToken]);

  useEffect(() => {
    axios
      .get(`/api/v1/topics`)
      .then((Response)=>{
        setTopics(Response.data);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, []);

  const formik = useFormik({
    initialValues: {
      title: "",
      body: "",
      difficullty: "",
      input_description: "",
      output_description: "",
      input: "",
      output: "",
      notes: "",
      score: "",
      memory_limit: "",
      time_limit: "",
      company_id: "",
      topic_id: "",
      contest_id:"",
    },
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
      .post("/api/v1/companies/problems", {
        title: values.title,
        body: values.body,
        difficullty: values.difficullty,
        input_description: values.input_description,
        output_description: values.output_description,
        input: values.input,
        output: values.output,
        notes: values.notes,
        score: values.score,
        memory_limit: values.memory_limit,
        time_limit: values.time_limit,
        company_id: token.id,
        topic_id: values.topic_id,
        contest_id: contest_id,
      })
      .then((response) => {
        toggleModal();
        document.location.reload(true);
        toast.success("Problem Added Successfully");
        setDisabled(false);
      })
      .catch((err) => {
        toast.error("Failed to Create Problem");
        setDisabled(false);
      });
  };

  return (  
    <div>
      <button 
        className="text-green-600 bg-white border-solid border-2 border-green-600 font-semibold px-2 py-1 rounded hover:text-green-400 hover:border-green-400 focus:outline-none flex items-center gap-2 text-sm"
        onClick={toggleModal}
      >
        <FaPlus /> Create Problem
      </button>

      <Modal title="Create Problem" isOpen={isOpen} handleClose={toggleModal}>
        <div className="my-5">
          <form className="flex flex-col gap-4">

            <div className="w-full mt-2">
              <label 
                className="block text-sm font-medium text-gray-600" 
                htmlFor="title"
              >
                Problem Name
              </label>
              <input
                className=" block w-full rounded-lg border p-2.5 text-sm  focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                type="text"
                id="title"
                placeholder="Problem Name"
                onChange={formik.handleChange}
              />
            </div>

            <div className="w-full mt-2">
              <label 
                className="block text-sm font-medium text-gray-600" 
                htmlFor="body"
              >
                Problem Body
              </label>
              <input
                className=" block w-full rounded-lg border p-2.5 text-sm  focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                type="text"
                id="body"
                placeholder="Problem body"
                onChange={formik.handleChange}
              />
            </div>

            <div>
              <label className='font-semibold text-gray-600 mr-1'>Difficullty</label>
              <select
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-600 focus:border-green-500 focus:ring-green-500 focus:outline-none'
                name="difficullty"
                required
                value={formik.values.difficullty}
                onChange={(e) => {
                  formik.setFieldValue("difficullty", e.target.value);
                }}
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
              {formik.touched.difficullty && formik.errors.difficullty ? (
                <div className="text-red-500 ml-4">
                  {formik.errors.difficullty}
                </div>
              ) : null}
            </div>

            <div className="w-full mt-2">
              <label 
                className="block text-sm font-medium text-gray-600" 
                htmlFor="input_description"
              >
                Input Description
              </label>
              <input
                className=" block w-full rounded-lg border p-2.5 text-sm  focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                type="text"
                id="input_description"
                placeholder="Input Description"
                onChange={formik.handleChange}
              />
            </div>

            <div className="w-full mt-2">
              <label 
                className="block text-sm font-medium text-gray-600" 
                htmlFor="output_description"
              >
                Output Description
              </label>
              <input
                className=" block w-full rounded-lg border p-2.5 text-sm  focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                type="text"
                id="output_description"
                placeholder="Output Description"
                onChange={formik.handleChange}
              />
            </div>

            <div className="w-full mt-2">
              <label 
                className="block text-sm font-medium text-gray-600" 
                htmlFor="input"
              >
                Input
              </label>
              <input
                className=" block w-full rounded-lg border p-2.5 text-sm  focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                type="text"
                id="input"
                placeholder="Input"
                onChange={formik.handleChange}
              />
            </div>

            <div className="w-full mt-2">
              <label 
                className="block text-sm font-medium text-gray-600" 
                htmlFor="output"
              >
                Output
              </label>
              <input
                className=" block w-full rounded-lg border p-2.5 text-sm  focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                type="text"
                id="output"
                placeholder="Output"
                onChange={formik.handleChange}
              />
            </div>

            <div className="w-full mt-2">
              <label 
                className="block text-sm font-medium text-gray-600" 
                htmlFor="notes"
              >
                Notes
              </label>
              <input
                className=" block w-full rounded-lg border p-2.5 text-sm  focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                type="text"
                id="notes"
                placeholder="Notes"
                onChange={formik.handleChange}
              />
            </div>

            <div className="w-full mt-2">
              <label 
                className="block text-sm font-medium text-gray-600" 
                htmlFor="score"
              >
                Score
              </label>
              <input
                className=" block w-full rounded-lg border p-2.5 text-sm  focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                type="text"
                id="score"
                placeholder="Score"
                onChange={formik.handleChange}
              />
            </div>

            <div className="w-full mt-2">
              <label 
                className="block text-sm font-medium text-gray-600" 
                htmlFor="memory_limit"
              >
                Memory Limit
              </label>
              <input
                className=" block w-full rounded-lg border p-2.5 text-sm  focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                type="text"
                id="memory_limit"
                placeholder="Memory Limit"
                onChange={formik.handleChange}
              />
            </div>

            <div className="w-full mt-2">
              <label 
                className="block text-sm font-medium text-gray-600" 
                htmlFor="time_limit"
              >
                Time Limit
              </label>
              <input
                className=" block w-full rounded-lg border p-2.5 text-sm  focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                type="text"
                id="time_limit"
                placeholder="Time Limit"
                onChange={formik.handleChange}
              />
            </div>

            <div>
              <label className='font-semibold text-gray-600 mr-1'>Topic</label>
              <select
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-600 focus:border-green-500 focus:ring-green-500 focus:outline-none'
                name="topic_id"
                required
                value={formik.values.topic_id}
                onChange={(e) => {
                  formik.setFieldValue("topic_id", e.target.value);
                }}
              >
                {
                  topics.map(el => {
                    return (
                      <option 
                        key={el.id}
                        value={el.id}
                      >
                        {el.name}
                      </option>
                    )
                  })
                }
              </select>
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
 
export default CreateProblem;
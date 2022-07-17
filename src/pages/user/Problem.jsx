import React, { useEffect, useState } from 'react';  
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";
import Navbar from '../../components/Navbar';  
import { useRef } from "react";
import Editor from "@monaco-editor/react"
import { useRecoilValue } from "recoil";
import { authState } from "../../recoil";
import { decodeToken } from "react-jwt";

const Problem = () => {
  const navigate = useNavigate();
  const param = useParams();
  const authToken = useRecoilValue(authState);
  const [token, setDecodeToken] = useState("");
  const [programmingLanguge, setProgrammingLanguge] = useState([]);
  const [selectedLanguge, setSelectedLanguge] = useState();
  const [editorLanguge, setEditorLanguge] = useState();
  const [problem, setProblem] = useState([]);
  const [values, setValues] = useState({
    theme: "light",
    language: "cpp",
  });
  const [defValue, setValue] = useState("// Start coding . . .");
  const editorRef = useRef(null);

  useEffect(() => {
    if (authToken) {
    const decode = decodeToken(authToken);
    setDecodeToken(decode);
    }
  }, [authToken]);

  useEffect(() => {
    axios
      .get(`/api/v1/problems/${param.problemId}`)
      .then((Response)=>{
        setProblem(Response.data);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, [param.problemId]);

  useEffect(() => {
    axios
      .get(`/api/v1/programming_languges`)
      .then((Response)=>{
        setProgrammingLanguge(Response.data);
        setSelectedLanguge(Response.data[0].id);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, []);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value});
  };

  const handleChangeLang = (e) => {
    setSelectedLanguge(e.target.value);
    var lang = programmingLanguge.filter(el => el.id == e.target.value);
    setEditorLanguge(lang[0].extension);
  };

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor; 
  };

  const handleReset = () => {
    setValue(); 
  };

  const handleSubmit = () => {
    axios
      .post('/api/v1/submissions', {
        developer_id: token.id,
        problem_id: param.problemId,
        programming_languges_id: selectedLanguge,
        source_code: editorRef.current.getValue(),
      })
      .then((Response)=>{
        toast.success("You are Submit Solution, wait for Result");
        navigate(`/submittions/${token.id}`);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return ( 
    <div className='bg-gray-200 min-h-screen pb-10'>
      <Navbar/>
      <div className='bg-white mb-4'>
        <h1 className='font-bold container mx-auto px-10 text-xl pt-6 pb-4'>{problem.title}</h1>
      </div>

      <div className='container mx-auto px-10'>
        <div className='flex'>
          <div className='w-3/4 bg-white px-6 py-4 shadow-2xl'>
            <div className='mb-4'>
              <h2 className='font-bold'>Description</h2>
              <p className='text-gray-600 '>{problem.body}</p>
            </div>

            <div className='mb-4'>
              <h2 className='font-bold'>Input</h2>
              <p className='text-gray-600'>{problem.input_description}</p>
            </div>

            <div className='mb-4'>
              <h2 className='font-bold'>Output</h2>
              <p className='text-gray-600'>{problem.output_description}</p>
            </div>

            <div className='mb-4'>
              <h3 className='font-bold'>Sample Input</h3>
              <div className='text-gray-600'>{problem.input}</div>
            </div>

            <div className='mb-4'>
              <h3 className='font-bold'>Sample Output</h3>
              <div className='text-gray-600'>{problem.output}</div>
            </div>

            <div className='mb-8'>
              <h2 className='font-bold'>Notes</h2>
              <p className='text-gray-600'>{problem.notes}</p>
            </div>

            <div>
              <h2 className='font-bold'>Start Code Here ...</h2>
              <div className='flex justify-end gap-x-4'>
                <div>
                  <label className='font-semibold text-gray-600 mr-1'>Language</label>
                  <select
                    className='text-gray-600 font-semibold text-xs border-2 border-green-600 rounded w-fit my-2 px-2 py-1 outline-none'
                    name="language"
                    // value={values.language}
                    required
                    onChange={handleChangeLang}
                  >
                    {
                      programmingLanguge.map(el => {
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

                <div>
                  <label className='font-semibold text-gray-600 mr-1'>Theme</label>
                  <select
                    className='text-gray-600 font-semibold text-xs border-2 border-green-600 rounded w-fit my-2 px-2 py-1 outline-none'
                    name="theme"
                    value={values.theme}
                    required
                    onChange={handleChange}
                  >
                    <option value="" defaultValue>
                      Theme
                    </option>
                    <option value="light">Light</option>
                    <option value="vs-dark">Dark</option>
                  </select>
                </div>
              </div>
              <div className='shadow-xl mt-4 mb-8'>
                <Editor
                  height="400px"
                  defaultLanguage={values.language}
                  language={editorLanguge}
                  // [ javascript - ruby - python - c - cpp - java ]
                  value={defValue}
                  onMount={handleEditorDidMount}
                  theme={values.theme}
                />
              </div>
              <div className='flex justify-end gap-x-8'>
                <button 
                  className='text-green-600 bg-white border-solid border-2 border-green-600 font-simibold text-xl py-1 px-6 rounded hover:text-green-400 hover:border-green-400 focus:outline-none'
                  onClick={handleReset}
                >
                  Reset
                </button>
                <button 
                  className='text-white bg-green-600 border-solid border-2 border-green-600 font-simibold font-simibold text-xl py-1 px-6 rounded hover:bg-green-400 hover:border-green-400 focus:outline-none'
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>

          <div className='w-1/4 ml-12 bg-white px-6 py-4 shadow-2xl h-fit'>
            <h1 className='text-xl font-bold mb-5 text-center'>Details</h1>

            <div className='flex gap-1 mt-2 mb-4'>
              <h3 className='text-gray-600 font-semibold'>Topic :</h3>
              <p className='text-green-600 font-semibold'>{problem?.topic?.name}</p>
            </div>

            <div className='flex gap-1 mb-4'>
              <h3 className='text-gray-600 font-semibold'>Score : </h3>
              <p className='text-green-600 font-semibold'>{problem?.score}</p>
              <h3 className='text-gray-600 font-semibold'>Points</h3>
            </div>

            <div className='flex gap-1 mb-4'>
              <h3 className='text-gray-600 font-semibold'>Time Limit : </h3>
              <p className='text-green-600 font-semibold'>{problem?.time_limit}</p>
              <h3 className='text-gray-600 font-semibold'> ms</h3>
            </div>

            <div className='flex gap-1 mb-4'>
              <h3 className='text-gray-600 font-semibold'>Memory Limit : </h3>
              <p className='text-green-600 font-semibold'>{problem?.memory_limit}</p>
              <h3 className='text-gray-600 font-semibold'> kb</h3>
            </div>

            <div className='flex gap-1 mb-4'>
              <h3 className='text-gray-600 font-semibold'>Difficullty : </h3>
              <p className='text-green-600 font-semibold'>{problem?.difficullty}</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
 
export default Problem;
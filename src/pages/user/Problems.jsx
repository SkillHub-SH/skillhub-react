import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar";
import Loader from "../../components/Loader";

const Problems = () => {
  const param = useParams();
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    axios
      .get("/api/v1/problems", {
        params: {
          topic_id: param.topicId,
        },
      })
      .then((Response) => {
        setProblems(Response.data);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, [param.topicId]);

  return (
    <div className="bg-gray-200 min-h-screen pb-10">
      <Navbar />
      <div className="container mx-auto px-10">
        <div className="flex justify-between items-center">
          <div className="text-gray-600 text-2xl font-bold border-b-4 py-2 my-4 border-green-600 w-fit">
            Problems
          </div>
          <a href={`/roadmap/${param.topicId}`}>
            <button 
              className="text-green-600 text-xl bg-white border-solid border-2 border-green-600 font-semibold px-8 py-1 mr-8 rounded-sm h-fit hover:text-green-400 hover:border-green-400 focus:outline-none"
            >
              RoadMap
            </button>
          </a>
        </div>
        <div>
          {problems.length === 0 && (
            <div className="flex items-center justify-center py-10">
              <Loader />
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 divide-y">
          {problems.map((el) => {
            return (
              <a key={el.id} href={`/problem/${el.id}`}>
                <div className="bg-white px-10 py-4 cursor-pointer flex justify-between items-center hover:bg-gray-50">
                  <div>
                    <h1 className="text-lg text-gray-700 font-medium hover:text-green-600">
                      {el.title}
                    </h1>
                    <div>
                      <p className="text-green-600 text-sm">{el.difficullty}</p>
                    </div>
                  </div>
                  <div>
                    <button className="text-green-600 text-sm bg-white border-solid border-[1px] border-green-600 font-semibold px-3 py-1 rounded-sm hover:text-green-400 hover:border-green-400 focus:outline-none ">
                      Solve Challenge
                    </button>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Problems;

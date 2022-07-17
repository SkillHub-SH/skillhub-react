import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar";
import CreateProblem from "../../components/models/CreateProblemModel";
import ShowProblemModel from "../../components/models/ShowProblemModel";
import { authState } from "../../recoil";
import { useRecoilValue } from "recoil";
import { decodeToken } from "react-jwt";

const Problems = () => {
  const [token, setDecodeToken] = useState("");
  const authToken = useRecoilValue(authState);
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    if (authToken) {
      const decode = decodeToken(authToken);
      setDecodeToken(decode);
    }
  }, [authToken]);

  useEffect(() => {
    if(token){
      axios
      .get("/api/v1/companies/problems", {
        params: {
          company_id: token.id,
        },
      })
      .then((Response) => {
        setProblems(Response.data);
      })
      .catch((err) => {
        toast.err(err.message);
      });
    }
  }, [token]);


  return ( 
    <div className="bg-gray-200 min-h-screen pb-10">
      <Navbar />
      <div className="bg-white py-4 mb-8">
        <div className="container mx-auto px-10 flex justify-between items-center">
          <div className="text-gray-600 text-2xl font-bold">
              Problems
          </div>
          <CreateProblem />
        </div>
      </div>
      <div className="container mx-auto px-10">
        <div>
          {problems.length === 0 && (
            <div className="flex items-center justify-center py-10 text-gray-600 font-bold">
              There are no problems, Create problem.
            </div>
          )}
        </div>

        <div>
          {problems && problems.map((el, index) => {
            return(
              <div
                className="bg-white p-6 mb-6 rounded shadow-xl"
                key={el.id}
              >
                <div className="relative">
                  <div className="flex justify-center items-center text-white font-bold bg-green-600 rounded-full w-8 h-8 absolute top-[-28px] left-[-28px]">
                    {index+1}
                  </div>
                  <div>
                    <ShowProblemModel 
                      problem={el} 
                      flag={true} 
                      index={index + 1}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 text-sm mb-2 md:grid-cols-2">
                  <div className="flex items-center gap-1">
                    <div className="font-bold text-gray-500">Topic : </div>
                    <div className="font-semibold text-gray-700">{el?.topic?.name}</div>
                  </div>
                  <div className="flex items-start gap-x-1">
                    <div className="font-bold text-gray-500 mt-[-2px]">Accepted Percentage : </div>
                    <div className="font-semibold text-gray-700">{el.accepted_percentage}</div>
                    <div className="font-bold text-gray-500">%</div>
                  </div>    
                </div>
                <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
                  <div className="flex items-center gap-1">
                    <div className="font-bold text-gray-500">Difficullty : </div>
                    <div className="font-semibold text-gray-700">{el.difficullty}</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="font-bold text-gray-500">LastUpdate : </div>
                    <div className="font-semibold text-gray-700">{new Date(el.updated_at).toLocaleString("en-us")}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
 
export default Problems;
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar";
import { authState } from "../../recoil";
import { useRecoilValue } from "recoil";
import { decodeToken } from "react-jwt";
import CreateProblem from "../../components/models/CreateProblemModel";
import CreateContest from "../../components/models/CreateContestModel";
import ShowProblemModel from "../../components/models/ShowProblemModel";

const Contests = () => {
  const [token, setDecodeToken] = useState("");
  const authToken = useRecoilValue(authState);
  const [contests, setContests] = useState([]);

  useEffect(() => {
    if (authToken) {
      const decode = decodeToken(authToken);
      setDecodeToken(decode);
    }
  }, [authToken]);

  useEffect(() => {
    if(token){
      axios
      .get("/api/v1/companies/contests", {
        params: {
          company_id: token.id,
        },
      })
      .then((Response) => {
        setContests(Response.data);
      })
      .catch((err) => {
        toast.err(err.message);
      });
    }
  }, [token]);

  return ( 
    <div className="bg-gray-200 min-h-screen pb-10">
      <Navbar/>
      <div className="bg-white py-4 mb-8">
        <div className="container mx-auto px-10 flex justify-between items-center">
          <div className="text-gray-600 text-2xl font-bold">
            Contests
          </div>
          <CreateContest />
        </div>
      </div>
      <div className="container mx-auto px-10">
        <div>
          {contests.length === 0 && (
            <div className="flex items-center justify-center py-10 text-gray-600 font-bold">
              There are no Contests, Create Contest.
            </div>
          )}
        </div>

        <div>
          {contests && contests.map((el, index) => {
            return(
              <div
              className="bg-white p-6 mb-6 rounded shadow-xl"
                key={el.id}
              >
                <div className="relative">
                  <div className="flex justify-center items-center text-white font-bold bg-green-600 rounded-full w-8 h-8 absolute top-[-28px] left-[-28px]">
                    {index+1}
                  </div>
                  <div className="flex justify-between items-center mb-1 mr-4">
                    <div className="flex items-center">
                      <div className="text-green-600 font-bold mb-2 pt-2">{el.name}</div>
                      <div className="mx-4 text-gray-600 font-bold">|</div>
                      <div className="text-gray-600 font-semibold">{el.description}</div>
                    </div>

                    <CreateProblem 
                      contest_id={el.id} 
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 text-sm mb-2 md:grid-cols-2">
                  <div className="flex items-center">
                    <div className="font-bold text-gray-500 mr-2">Num of Problems : </div>
                    <div className="font-semibold text-gray-700 mt-[2px]">{el?.problems.length}</div>
                  </div>
                  <div className="flex items-start gap-x-1">
                    <div className="font-bold text-gray-500 mt-[-2px]">Start Time : </div>
                    <div className="font-semibold text-gray-700">{new Date(el.start_at).toLocaleString("en-us")}</div>
                  </div>    
                </div>
                <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
                  <div className="flex items-center gap-1">
                    <div className="font-bold text-gray-500">Level : </div>
                    <div className="font-semibold text-gray-700">{el.level}</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="font-bold text-gray-500">End Time : </div>
                    <div className="font-semibold text-gray-700">{new Date(el.end_at).toLocaleString("en-us")}</div>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2 mt-2 pb-4 border-b-2 border-gray-300">
                  <div className="flex items-center gap-1">
                    <div className="font-bold text-gray-500">Status : </div>
                    <div className="font-semibold text-gray-700">{el.status}</div>
                  </div>
                </div>

                <div>
                  {el.problems.length === 0 && (
                    <div className="flex items-center justify-center pt-4 text-gray-600 font-semibold">
                      There are no Problems, Create Problem.
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  {el.problems && el.problems.map((el, index) => {
                    return(
                      <div 
                      className="flex items-center mb-4 gap-x-8"
                        key={el.id}
                      >
                        <div className="flex items-center gap-x-2">
                          <div
                            className="flex justify-center items-center text-white font-bold bg-green-600 rounded-full w-6 h-6"
                          >
                            {index + 1}
                          </div>
                          <div>
                            <ShowProblemModel 
                              problem={el} 
                              index={index + 1}
                            />
                          </div>
                        </div>
                        <div className="flex items-center gap-x-1">
                          <div className="font-semibold text-gray-500 mt-[-2px]">Accepted Percentage : </div>
                          <div className="font-semibold text-gray-700">{el.accepted_percentage}</div>
                          <div className="font-bold text-gray-500">%</div>
                        </div>    
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
 
export default Contests;
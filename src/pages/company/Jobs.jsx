import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar";
import { authState } from "../../recoil";
import { useRecoilValue } from "recoil";
import { decodeToken } from "react-jwt";
import CreateJobModel from "../../components/models/CreateJobModel";
import ShowAllJobAppModel from "../../components/models/ShowAllJobAppModel";

const Jobs = () => {
  const [token, setDecodeToken] = useState("");
  const authToken = useRecoilValue(authState);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    if (authToken) {
      const decode = decodeToken(authToken);
      setDecodeToken(decode);
    }
  }, [authToken]);

  useEffect(() => {
    if(token){
      axios
      .get("/api/v1/companies/jobs", {
        params: {
          company_id: token.id,
        },
      })
      .then((Response) => {
        setJobs(Response.data);
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
            Jobs
          </div>
          <CreateJobModel />
        </div>
      </div>
      <div className="container mx-auto px-10">
        <div>
          {jobs.length === 0 && (
            <div className="flex items-center justify-center py-10 text-gray-600 font-bold">
              There are no Jobs, Add Job.
            </div>
          )}
        </div>

        <div>
          {jobs && jobs.map((el, index) => {
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
                    <ShowAllJobAppModel 
                      index={index + 1}
                      job={el}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center mt-2">
                    <div className="w-2 h-2 bg-green-600 mr-2"></div>
                    <div className="font-bold text-gray-500 mr-2">Description</div>
                  </div>
                  <div className="font-semibold text-gray-700 ml-4">{el.description}</div>
                </div>

                <div>
                  <div className="flex items-center mt-2">
                    <div className="w-2 h-2 bg-green-600 mr-2"></div>
                    <div className="font-bold text-gray-500 mr-2">Requirements</div>
                  </div>
                  <div className="font-semibold text-gray-700 ml-4">{el.requirements}</div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
 
export default Jobs;
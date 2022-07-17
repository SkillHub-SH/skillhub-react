import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar";
import ApplyJobModel from "../../components/models/ApplyJobModel";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios
      .get("/api/v1/jobs")
      .then((Response) => {
        setJobs(Response.data);
      })
      .catch((err) => {
        toast.err(err.message);
      });
  }, []);

  return ( 
    <div className="bg-gray-200 min-h-screen pb-10">
      <Navbar />
      <div className="container mx-auto px-10">
        <div className="text-gray-600 text-2xl font-bold border-b-4 py-2 my-2 mb-8 border-green-600 w-fit">
          Jobs
        </div>

        <div>
          {jobs.length === 0 && (
            <div className="flex items-center justify-center py-10 text-gray-600 font-bold">
              There are no Jobs.
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
                <div>
                  <ApplyJobModel
                    job={el}
                    index={index + 1}
                  />
                </div>

                <div className="grid grid-cols-1 gap-x-2 md:grid-cols-2 ml-8">
                  <div className="flex items-center">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-600 mr-2"></div>
                      <div className="font-bold text-gray-500 mr-2">Applicants :</div>
                    </div>
                    <div className="font-semibold text-gray-700 pt-[2px]">{el.num_of_applicants}</div>
                    <div className="font-bold text-sm text-gray-500 ml-2 pt-[2px]">Application</div>
                  </div>

                  <div className="flex items-center mt-2">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-600 mr-2"></div>
                      <div className="font-bold text-gray-500 mr-2">Date :</div>
                    </div>
                    <div className="font-semibold text-gray-700 pt[2px]">{new Date(el.created_at).toLocaleString("en-us")}</div>
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
 
export default Jobs;
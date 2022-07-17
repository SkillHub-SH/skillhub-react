import React, {useEffect, useState} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal } from "./Base";
import useToggleModal from "../../hooks/useToggleModel";

const ShowAllJobAppModel = ({job, index}) => {
  const [isOpen, toggleModal] = useToggleModal();
  const [jobsApp, setJobsApp] = useState([]);

  useEffect(() => {
    axios
      .get("/api/v1/companies/job_applications", {
        params: {
          job_id: job.id,
        },
      })
      .then((Response) => {
        setJobsApp(Response.data);
      })
      .catch((err) => {
        toast.err(err.message);
      });
  }, []);

  return (  
    <div>
      <div 
        className="text-green-600 font-bold mb-2 pt-2 underline hover:cursor-pointer"
        onClick={toggleModal}
      >
        {job.title}
      </div>

      <Modal title="Developers applied" isOpen={isOpen} handleClose={toggleModal}>
        <div >
          <div className='w-full px-4 py-2'>
            <div className="flex">
              <div
                className="flex justify-center items-center text-white font-bold bg-gray-500 rounded-full w-6 h-6"
              >
                {index}
              </div>
              <div className="text-gray-600 font-bold mb-2 ml-2">
                {job.title}
              </div>
            </div>

            <div>
              <div className="bg-gray-100 px-4 py-2 rounded divide-y-2 divide-gray-300">
                {jobsApp.length === 0 && (
                  <div className="flex items-center justify-center py-10 text-gray-600 font-bold">
                    There are no Applications.
                  </div>
                )}

                {jobsApp && jobsApp.map((el, index) => {
                  return(
                    <div
                      className="py-4"
                      key={el.id}
                    > 
                      <div className="flex items-center">
                        <div className="flex justify-center items-center w-4 h-4 bg-green-600 text-white rounded p-2 mr-2">{index + 1}</div>
                        <div className="flex items-center gap-x-1">
                          <div 
                            className="text-gray-600 font-semibold"
                          >
                            Name :
                          </div>
                          <div className="text-gray-600 font-medium text-sm mt-1">{el.developer_name}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-x-1 ml-[24px]">
                        <div 
                          className="text-gray-600 font-semibold"
                        >
                          Email :
                        </div>
                        <div className="text-gray-600 font-medium text-sm mt-1">{el.developer_email}</div>
                      </div>

                      <div className="flex items-center gap-x-1 ml-[24px]">
                        <div className="text-gray-600 font-medium text-sm mt-1">{el.developer_current_position}</div>
                        <div className="text-green-600 font-medium text-sm mt-1">at</div>
                        <div className="text-gray-600 font-medium text-sm mt-1">{el.developer_work_at}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
 
export default ShowAllJobAppModel;
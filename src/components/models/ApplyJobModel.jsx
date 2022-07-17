import React, {useState, useEffect} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal } from "./Base";
import useToggleModal from "../../hooks/useToggleModel";
import { useRecoilValue } from "recoil";
import { authState } from "../../recoil";
import { decodeToken } from "react-jwt";

const ApplyJobModel = ({job, index}) => {
  const [disabled, setDisabled] = useState(false);
  const [isOpen, toggleModal] = useToggleModal();
  const authToken = useRecoilValue(authState);
  const [token, setDecodeToken] = useState("");

  useEffect(() => {
    if (authToken) {
    const decode = decodeToken(authToken);
    setDecodeToken(decode);
    }
  }, [authToken]);

  const handelApply = () => {
    setDisabled(true);
    axios
      .post("/api/v1/job_applications", {
        company_id: job.company_id,
        developer_id: token.id,
        job_id: job.id
      })
      .then((response) => {
        toggleModal();
        document.location.reload(true);
        toast.success("Apply Successfully");
        setDisabled(false);
      })
      .catch((err) => {
        toast.error("Failed to Apply");
        setDisabled(false);
      });
  };

  return (  
    <div>
      <div className="flex items-center">
        <div className="flex justify-center items-center text-white font-bold bg-green-600 rounded-full w-6 h-6">
          {index}
        </div>
        <div 
          className="text-green-600 font-bold mb-2 pt-2 underline hover:cursor-pointer ml-2"
          onClick={toggleModal}
        >
          {job.title}
        </div>
      </div>

      <Modal title="Job Details" isOpen={isOpen} handleClose={toggleModal}>
        <div>
          <div className='w-full bg-white px-4 py-4 rounded'>
            <div className="flex items-center">
              <div className="flex justify-center items-center text-white font-semibold bg-green-600 rounded-full w-6 h-6">
                {index}
              </div>
              <div 
                className="text-green-600 font-bold mb-2 pt-2 ml-2"
                onClick={toggleModal}
              >
                {job.title}
              </div>
            </div>

            <div className="ml-4">
              <div className="flex items-center mt-2">
                <div className="w-2 h-2 bg-green-600 mr-2"></div>
                <div className="font-bold text-gray-500 mr-2">Description</div>
              </div>
              <div className="text-sm font-medium text-gray-700 ml-4">{job.description}</div>
            </div>

            <div className="ml-4">
              <div className="flex items-center mt-2">
                <div className="w-2 h-2 bg-green-600 mr-2"></div>
                <div className="font-bold text-gray-500 mr-2">Requirements</div>
              </div>
              <div className="text-sm font-medium text-gray-700 ml-4">{job.requirements}</div>
            </div>
            
          </div>
        </div>
        <div className="flex flex-row-reverse gap-3 mt-4">
          <button 
            className="text-green-600 bg-white border-solid border-2 border-green-600 font-semibold w-24 py-1 rounded hover:text-green-400 hover:border-green-400 focus:outline-none"
            type="submit" 
            disabled={disabled}
            onClick={handelApply}
          >
            Apply
          </button>
          <button 
            className="text-red-500 bg-white border-solid border-2 border-red-600 font-semibold w-24 py-1 rounded hover:text-red-300 hover:border-red-300 focus:outline-none"
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
 
export default ApplyJobModel;
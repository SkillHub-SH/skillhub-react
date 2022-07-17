import React from "react";
import { Modal } from "./Base";
import useToggleModal from "../../hooks/useToggleModel";

const ShowCode = ({id, source_code}) => {
  const [isOpen, toggleModal] = useToggleModal();

  return (  
    <div>
      <a
        className="font-medium text-blue-600 underline hover:cursor-pointer"
        onClick={toggleModal}
      >
        {id}
      </a>

      <Modal title="Your Submittion" isOpen={isOpen} handleClose={toggleModal}>
        <div className="bg-gray-200 rounded-xl p-6">
          {source_code}
        </div>
      </Modal>
    </div>
  );
}
 
export default ShowCode;
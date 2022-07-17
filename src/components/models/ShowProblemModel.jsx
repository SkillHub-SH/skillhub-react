import React from "react";
import { Modal } from "./Base";
import useToggleModal from "../../hooks/useToggleModel";

const ShowProblemModel = ({problem, index, flag}) => {
  const [isOpen, toggleModal] = useToggleModal();

  return (  
    <div>
      {flag ? (
        <div 
          className="text-green-600 font-bold mb-2 pt-2 underline hover:cursor-pointer"
          onClick={toggleModal}
        >
          {problem.title}
        </div>
      ):(
        <div  
          className="font-semibold text-gray-600 underline hover:cursor-pointer"
          onClick={toggleModal}
        >
          {problem.title}
        </div>
      )}

      <Modal title="Problem Details" isOpen={isOpen} handleClose={toggleModal}>
        <div>
          <div className='w-full bg-white px-6 py-4 shadow-2xl rounded'>
            <div className="flex justify-center ml-[-30px]">
              <div
                className="flex justify-center items-center text-white font-bold bg-green-600 rounded-full w-6 h-6"
              >
                {index}
              </div>
              <div className="text-green-600 font-bold mb-4 ml-2 text-center">
                {problem.title}
              </div>
            </div>
            <div className="grid grid-cols-2 border-b-2 mb-2">
              <div className='flex gap-1 mb-4'>
                <h3 className='text-gray-600 font-semibold'>Topic :</h3>
                <p className='text-green-600 font-semibold'>{problem?.topic?.name}</p>
              </div>

              <div className='flex gap-1 mb-4'>
                <h3 className='text-gray-600 font-semibold'>Time Limit : </h3>
                <p className='text-green-600 font-semibold'>{problem?.time_limit}</p>
                <h3 className='text-gray-600 font-semibold'> ms</h3>
              </div>

              <div className='flex gap-1 mb-4'>
                <h3 className='text-gray-600 font-semibold'>Difficullty : </h3>
                <p className='text-green-600 font-semibold'>{problem?.difficullty}</p>
              </div>

              <div className='flex gap-1 mb-4'>
                <h3 className='text-gray-600 font-semibold'>Memory Limit : </h3>
                <p className='text-green-600 font-semibold'>{problem?.memory_limit}</p>
                <h3 className='text-gray-600 font-semibold'> kb</h3>
              </div>
            </div>

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

            <div className='mb-2'>
              <h2 className='font-bold'>Notes</h2>
              <p className='text-gray-600'>{problem.notes}</p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
 
export default ShowProblemModel;
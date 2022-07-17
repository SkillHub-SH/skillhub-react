import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import { FaLaptopCode } from 'react-icons/fa';
import { AiOutlineFieldNumber } from 'react-icons/ai';
import Navbar from '../../components/Navbar'; 
import Loader from '../../components/Loader';

const Topics = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    axios
      .get("/api/v1/topics")
      .then((Response)=>{
        setTopics(Response.data);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, []);

  return ( 
    <div className='bg-gray-200 min-h-screen'>
      <Navbar/>
      <div className='container mx-auto px-10'>
        <div
          className='text-gray-600 text-2xl font-bold border-b-4 py-2 my-4 border-green-600 w-fit'
        >
          Topics
        </div>
        <div>
          {
            topics.length === 0 &&
              <div className="flex items-center justify-center py-10">
                <Loader/>
              </div>
          }
        </div>
        <div className='grid grid-cols-3 gap-4'>
          {
            topics.map(el =>{
              return(
                <div 
                  className='bg-white p-6 shadow-md flex justify-between'
                  key={el.id}
                >
                  <div>
                    <h2
                      className='font-bold text-lg mb-2'
                    >
                      {el.name}
                    </h2>

                    <div className='flex items-center mb-2'>
                      <AiOutlineFieldNumber className='text-gray-600 text-xl' />
                      <p
                        className='ml-1 text-green-600 font-bold'
                      >
                        {el.number_of_problems} 
                        <span
                          className='ml-1 text-gray-600 font-semibold'
                        >
                          Problem
                        </span>
                      </p>
                    </div>

                    <div>
                      <a href={`/problems/${el.id}`}>
                        <button className='text-green-600 bg-white border-solid border-2 border-green-600 font-simibold px-1 rounded hover:text-green-400 hover:border-green-400 focus:outline-none '>
                          Get Started
                        </button>
                      </a>
                    </div>
                  </div>

                  <div className='text-gray-100 text-[80px]'>
                    <FaLaptopCode/>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}
 
export default Topics;
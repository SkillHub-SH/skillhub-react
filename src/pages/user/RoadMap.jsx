import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar";
import Loader from "../../components/Loader";

const RoadMap = () => {
  const param = useParams();
  const [roadMap, setRoadMap] = useState([]);

  useEffect(() => {
    axios
      .get("/api/v1/roadmaps", {
        params: {
          topic_id: param.topicId,
        },
      })
      .then((Response) => {
        setRoadMap(Response.data);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, [param.topicId]);

  return ( 
    <div className="bg-gray-200 min-h-screen pb-10">
      <Navbar />
      <div className="container mx-auto px-10">
        <div className="text-gray-600 text-2xl font-bold border-b-4 py-2 my-2 border-green-600 w-fit">
          {roadMap.title}
        </div>

        <div>
          {roadMap.length === 0 && (
            <div className="flex items-center justify-center py-10">
              <Loader />
            </div>
          )}
        </div>

        {roadMap.length !== 0 && (
          <div>
            <div className="bg-white text-gray-600 font-semibold p-4 mt-4 rounded">
              {roadMap.description}
            </div>

            <div className="grid grid-cols-3 gap-8 mt-6">
              <div className="border-l-2 border-green-500">
                <div className="text-green-600 font-normal text-3xl pl-6 pb-2 capitalize">
                  {roadMap?.levels[0]?.title}
                </div>
                <div>
                  {roadMap?.levels[0]?.resources.map((el, index)=> {
                    return (
                      <div key={el.id} className="bg-white rounded-xl mb-6">
                        <div className="relative mb-2">
                          <a href={el.url} target="blank">
                            <div className="bg-green-500 text-white font-bold px-10 py-1 mr-[6px]">
                              {el.title}
                            </div>
                          </a>
                          <div className="flex justify-center items-center text-white font-bold bg-green-600 rounded-full w-12 h-12 mt-[-9px] ml-[-6px] absolute top-0 right-0">
                            {index+1}
                          </div>
                        </div>

                        <div className="flex items-center mb-4 pb-2">
                          <div className="w-2 h-2 rounded-full bg-green-600 mx-2"></div>
                          <div className="text-gray-600">{"Time : " + el.estimated_time + " Hours"}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="border-l-2 border-orange-400">
                <div className="text-orange-500 font-normal text-3xl pl-6 pb-2 capitalize">
                  {roadMap?.levels[1]?.title}
                </div>
                <div>
                  {roadMap?.levels[1]?.resources.map((el, index)=> {
                    return (
                      <div key={el.id} className="bg-white rounded-xl mb-6">
                        <div className="relative mb-2">
                          <a href={el.url} target="blank">
                            <div className="bg-orange-400 text-white font-bold px-10 py-1 mr-[6px]">
                              {el.title}
                            </div>
                          </a>
                          <div className="flex justify-center items-center text-white font-bold bg-orange-500 rounded-full w-12 h-12 mt-[-9px] ml-[-6px] absolute top-0 right-0">
                            {index+1}
                          </div>
                        </div>

                        <div className="flex items-center mb-4 pb-2">
                          <div className="w-2 h-2 rounded-full bg-orange-500 mx-2"></div>
                          <div className="text-gray-600">{"Time : " + el.estimated_time + " Hours"}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="border-l-2 border-red-500">
                <div className="text-red-600 font-normal text-3xl pl-6 pb-2 capitalize">
                  {roadMap?.levels[2]?.title}
                </div>
                <div>
                  {roadMap?.levels[2]?.resources.map((el, index)=> {
                    return (
                      <div key={el.id} className="bg-white rounded-xl mb-6">
                        <div className="relative mb-2">
                          <a href={el.url} target="blank">
                            <div className="bg-red-500 text-white font-bold px-10 py-1 mr-[6px]">
                              {el.title}
                            </div>
                          </a>
                          <div className="flex justify-center items-center text-white font-bold bg-red-600 rounded-full w-12 h-12 mt-[-9px] ml-[-6px] absolute top-0 right-0">
                            {index+1}
                          </div>
                        </div>

                        <div className="flex items-center mb-4 pb-2">
                          <div className="w-2 h-2 rounded-full bg-red-600 mx-2"></div>
                          <div className="text-gray-600">{"Time : " + el.estimated_time + " Hours"}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
 
export default RoadMap;
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar";
import Loader from "../../components/Loader";
import Medal1 from "../../images/medal.svg";
import Medal2 from "../../images/medal1.svg";
import Medal3 from "../../images/medal2.svg";
import Medal4 from "../../images/medal3.svg";

const LeaderBoard = () => {
  const [LeaderBoard, setLeaderBoard] = useState([]);
  const [medal] = useState([Medal1, Medal2, Medal3, Medal4, Medal4]);
  const [color] = useState(["text-red-500", "text-orange-500", "text-indigo-600", "text-blue-600", "text-green-500"]);

  useEffect(() => {
    axios
      .get("/api/v1/leaderboards")
      .then((Response) => {
        setLeaderBoard(Response.data);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, []);

  return ( 
    <div className="bg-gray-200 min-h-screen pb-10">
      <Navbar />
      <div className="container mx-auto px-10">
        <div className="text-gray-600 text-2xl font-bold border-b-4 py-2 my-2 border-green-600 w-fit">
          LeaderBoard
        </div>

        <div>
          {LeaderBoard.length === 0 && (
            <div className="flex items-center justify-center py-10">
              <Loader />
            </div>
          )}
        </div>
        
        <div className="bg-white px-8 py-4 mt-4 divide-y">
          <div className="grid grid-cols-5 gap-8 mb-2 text-center text-green-600 font-bold">
            <div>#</div>
            <div>NAME</div>
            <div>SCORE</div>
            <div>RANK</div>
            <div></div>
          </div>
          {LeaderBoard && LeaderBoard.map((el, index) => {
            return(
              <div 
                key={el.id}
                className="grid grid-cols-5 gap-8 py-2 text-center"
              >
                <div className="mt-2 text-green-600 font-bold">{index + 1}</div>
                <div className={`mt-2 font-bold ${color[index]}`}>{el.username}</div>
                <div className="mt-2 text-gray-600 font-semibold">{el?.rank?.score}</div>
                <div className='mt-2 text-gray-600 font-semibold'>{el?.rank?.title}</div>
                <div>
                  <img 
                    className="w-10 h-10"
                    src={medal[index]} 
                    alt="medal"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
 
export default LeaderBoard;
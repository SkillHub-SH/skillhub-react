import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar";
import Loader from "../../components/Loader";

const Profile = () => {
  const param = useParams();
  const [profile, setProfile] = useState();

  // useEffect(() => {
  //   axios
  //     .get("/api/v1/roadmaps", {
  //       params: {
  //         topic_id: param.topicId,
  //       },
  //     })
  //     .then((Response) => {
  //       setProfile(Response.data);
  //     })
  //     .catch((err) => {
  //       toast.error(err.message);
  //     });
  // }, []);

  return ( 
    <div className="bg-gray-200 min-h-screen pb-10">
      <Navbar />
      <div className="container mx-auto px-10">

        <div>
          {!profile && (
            <div className="flex items-center justify-center py-10">
              <Loader />
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}
 
export default Profile;
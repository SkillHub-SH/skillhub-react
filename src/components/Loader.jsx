import React from "react";
import { CgSpinnerTwoAlt } from "react-icons/cg";

const Loader = ({className}) => {
  return <CgSpinnerTwoAlt className={`${className} animate-spin text-5xl`} />;
}
 
export default Loader;
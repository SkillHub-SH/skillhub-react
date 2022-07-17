import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RecoilRoot } from "recoil";

axios.defaults.baseURL = "https://skillhub-sh.herokuapp.com";
axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
      <ToastContainer />
    </RecoilRoot>
  </React.StrictMode>
);

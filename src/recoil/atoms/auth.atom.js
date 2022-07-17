import { atom } from "recoil";

export const authState = atom({
  key: "authState",
  default: localStorage.getItem("token"),
});
import { atom, selector } from "recoil";

export const loginToken = atom({
    key : "loginToken",
    default : ""
});

export const memInfo = atom({
    key : "memInfo",
    default : null
});

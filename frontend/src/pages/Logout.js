import { redirect } from "react-router-dom";
import { removeToken } from "../utils/auth";

export const action = () => {
    removeToken();
    return redirect('/');
};
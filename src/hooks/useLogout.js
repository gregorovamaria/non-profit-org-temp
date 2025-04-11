import React from "react";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logoutUser } from "../features/user/userSlice";

const useLogout = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const logout = () => {
		if (import.meta.env.VITE_SOURCE != "local") {
			signOut(auth)
				.then(() => {
					dispatch(logoutUser());
					toast.success("User was successfully logged out...");
					navigate("../blogs");
				})
				.catch((err) => {
					console.log(err.message);
					toast.error("There was an error...");
					return;
				});
		} else {
			try {
				dispatch(logoutUser());
				toast.success("User was successfully logged out...");
				navigate("../blogs");
			} catch (error) {
				console.log(err.message);
				toast.error("There was an error...");
				return;
			}
		}
	};

	return { logout };
};

export default useLogout;

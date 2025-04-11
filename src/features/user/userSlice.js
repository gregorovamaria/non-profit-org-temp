import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// themes
import { themes } from "../../utils/data";

const getThemeFromLocalStorage = () => {
	const theme = localStorage.getItem("theme") || themes.light;
	document.documentElement.setAttribute("data-theme", theme);
	return theme;
};

const getUserFromLocalStorage = () => {
	const user = localStorage.getItem("user") || null;
	return user;
};

const initialState = {
	user: getUserFromLocalStorage(),
	theme: getThemeFromLocalStorage(),
	showPassword: false,
};

const userSlice = createSlice({
	name: "user",
	initialState: initialState,
	reducers: {
		loginUser: (state, action) => {
			const user = {
				email: action.payload.email,
				token: action.payload.token,
				uid: action.payload.uid,
			};
			state.user = user;
			localStorage.setItem("user", JSON.stringify(user));
		},
		logoutUser: (state) => {
			state.user = null;
			localStorage.removeItem("user");
			localStorage.removeItem("blogsData");
		},
		toggleTheme: (state) => {
			const { light, dark } = themes;
			state.theme = state.theme === light ? dark : light;
			document.documentElement.setAttribute("data-theme", state.theme);
			localStorage.setItem("theme", state.theme);
		},
		toggleShowPassword: (state) => {
			state.showPassword = state.showPassword === false ? true : false;
		},
	},
});

export const { loginUser, logoutUser, toggleTheme, toggleShowPassword } =
	userSlice.actions;

export default userSlice.reducer;

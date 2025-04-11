import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import blogsReducer from "./features/blogs/blogsSlice";
import modalReducer from "./features/modal/modalSlice";
import paginationReducer from "./features/pagination/paginationSlice";
import imagesReducer from "./features/images/imagesSlice";

export const store = configureStore({
	reducer: {
		userState: userReducer,
		blogsState: blogsReducer,
		modalState: modalReducer,
		paginationState: paginationReducer,
		imagesState: imagesReducer,
	},
});

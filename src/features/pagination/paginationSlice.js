import { createSlice } from "@reduxjs/toolkit";
import { pageSize } from "../../utils/data";

const initialState = {
	page: 1,
	direction: "next",
	lastVisible: null,
};

const paginationSlice = createSlice({
	name: "pagination",
	initialState,
	reducers: {
		setPagination: (state, action) => {
			// console.log("page: ", actions.payload.page);
			// console.log("direction: ", actions.payload.direction);
			// console.log("lastVisible: ", actions.payload.lastVisible);
			state.page = action.payload.page;
			state.direction = action.payload.direction;
			state.lastVisible = action.payload.lastVisible;
		},
	},
});

export const { setPagination } = paginationSlice.actions;

export default paginationSlice.reducer;

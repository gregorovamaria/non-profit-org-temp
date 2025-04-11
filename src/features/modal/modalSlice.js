import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isOpen: false,
	allBlogs: null,
	id: null,
	isImgOpen: false,
	imgForDeletion: null,
};

const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		openModal: (state, actions) => {
			state.isOpen = true;

			const { type, id } = actions.payload;
			if (type === "all") {
				state.allBlogs = true;
			}
			if (type === "singleBlog") {
				state.allBlogs = false;
				state.id = id;
			}
		},
		closeModal: (state) => {
			state.isOpen = false;
		},
		openImgModal: (state, actions) => {
			state.imgForDeletion = actions.payload;
			state.isImgOpen = true;
		},
		closeImgModal: (state) => {
			state.isImgOpen = false;
		},
	},
});

export const { openModal, closeModal, openImgModal, closeImgModal } =
	modalSlice.actions;

export default modalSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
	// getBlogs,
	deleteBlogById,
	getAllBlogs,
	deleteFolderFromStorage,
} from "../../utils";

import { deleteBlogLocal, deleteAllBlogsLocal } from "../../utils/index_local";

// export const getBlogsInfo = createAsyncThunk(
// 	"blogs/getBlogsInfo",
// 	async (_, thunkApi) => {
// 		try {
// 			const { results, uniqueYears } = await getBlogs();
// 			return { results, uniqueYears };
// 		} catch (error) {
// 			return thunkApi.rejectWithValue(error);
// 		}
// 	}
// );

const getLayoutFromLocalStorage = () => {
	const layout = localStorage.getItem("layout") || "grid";
	return layout;
};

const initialState = {
	// blogs: [],
	richTextEditorInfo: null,
	totalCount: 0,
	// isLoading: true,
	layout: getLayoutFromLocalStorage(),
	error: null,
	openForm: false,
	images: [],
	calledFrom: "main",
};

const blogsSlice = createSlice({
	name: "blogs",
	initialState,
	reducers: {
		// setBlogs: (state, action) => {
		// 	state.blogs = action.payload;
		// },

		// addBlog: (state, action) => {
		// 	const { author, title, src, alt, info } = action.payload;

		// 	state.blogs.push({
		// 		id: nanoid(),
		// 		author: author,
		// 		date: new Date().toLocaleDateString("en-GB"),
		// 		title,
		// 		src,
		// 		alt,
		// 		info,
		// 	});
		// 	state.totalCount += 1;
		// },

		// editBlog: (state, action) => {
		// 	const { id, author, title, src, alt, info } = action.payload;

		// 	try {
		// 		state.blogs.forEach((item) => {
		// 			if (item.id === id) {
		// 				item.author = author;
		// 				item.title = title;
		// 				item.src = src;
		// 				item.alt = alt;
		// 				item.info = info;
		// 			}
		// 		});
		// 	} catch (error) {
		// 		console.log(error);
		// 	}
		// },

		setCallFrom: (state, action) => {
			state.calledFrom = action.payload;
		},

		setTotalCount: (state, action) => {
			state.totalCount = action.payload;
		},

		deleteBlog: (state, action) => {
			const id = action.payload;

			if (import.meta.env.VITE_SOURCE != "local") {
				deleteBlogById(id);
			} else {
				deleteBlogLocal(id);
			}
			state.totalCount -= 1;
		},

		clearAllBlogs: (state) => {
			if (import.meta.env.VITE_SOURCE != "local") {
				const blogs = getAllBlogs();

				blogs.then((allBlogs) => {
					allBlogs.forEach((blogId) => {
						deleteFolderFromStorage(blogId.id);
					});
				});

				blogs.then((allBlogs) => {
					allBlogs.forEach((blogId) => {
						deleteBlogById(blogId.id);
					});
				});
			} else {
				deleteAllBlogsLocal();
			}
			state.totalCount = state.totalCount - state.totalCount;
		},

		setRichTextEditorState: (state, action) => {
			state.richTextEditorInfo = action.payload;
		},

		clearInputs: (state, action) => {
			const { id, author, date, title, src, alt, info } = action.payload;

			state.selectedBlog = {
				id,
				author,
				date,
				title,
				src,
				alt,
				info,
			};

			state.blogs.forEach((item) => {
				if (item.id === id) {
					item.title = "";
					item.src = "";
					item.alt = "";
					item.info = "";
				}
			});
		},

		toggleLayout: (state, action) => {
			state.layout = action.payload;
			localStorage.setItem("layout", state.layout);
		},

		toggleForm: (state, action) => {
			state.openForm = action.payload;
		},
	},
	// extraReducers: (builder) => {
	// 	builder
	// 		.addCase(getBlogsInfo.pending, (state) => {
	// 			state.isLoading = true;
	// 		})
	// 		.addCase(getBlogsInfo.fulfilled, (state, action) => {
	// 			state.isLoading = false;
	// 			state.blogs = action.payload;
	// 			state.totalCount = action.payload.length;
	// 		})
	// 		.addCase(getBlogsInfo.rejected, (state, action) => {
	// 			state.isLoading = false;
	// 			console.log(action.error);
	// 		});
	// },
});

export const {
	setCallFrom,
	setTotalCount,
	clearAllBlogs,
	deleteBlog,
	// editBlog,
	// addBlog,
	// setBlogs,
	setRichTextEditorState,
	clearInputs,
	toggleLayout,
	toggleForm,
} = blogsSlice.actions;

export default blogsSlice.reducer;

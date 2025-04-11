import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// pages
import {
	HomeLayout,
	Landing,
	About,
	Contact,
	Blogs,
	SingleBlog,
	SingleBlogLayout,
	BlogForm,
	Support,
	Login,
	Error,
} from "./pages/";

// components
import ErrorElement from "./components/ErrorElement";

// loaders
import { loader as landingLoader } from "./pages/Landing";
import { loader as blogsLoader } from "./pages/Blogs";
import { loader as singleBlogLoader } from "./pages/SingleBlogLayout";
// import { loader as blogFormLoader } from "./pages/BlogForm";

// actions
import { action as loginAction } from "./pages/Login";
import { action as blogFormAction } from "./pages/BlogForm";
import { store } from "./store";

const router = createBrowserRouter([
	{
		path: "/",
		element: <HomeLayout />,
		errorElement: <Error />,
		children: [
			{
				index: true,
				element: <Landing />,
				errorElement: <ErrorElement />,
				loader: landingLoader,
			},
			{
				path: "login",
				element: <Login />,
				errorElement: <Error />,
				action: loginAction(store),
			},
			{
				path: "about",
				element: <About />,
				errorElement: <ErrorElement />,
			},
			{
				path: "contact",
				element: <Contact />,
				errorElement: <ErrorElement />,
			},
			{
				path: "blogs",
				element: <Blogs />,
				errorElement: <ErrorElement />,
				loader: blogsLoader(store),
			},
			{
				path: "blogs/:id",
				element: <SingleBlogLayout />,
				errorElement: <ErrorElement />,
				loader: singleBlogLoader(store),
				action: blogFormAction,
				children: [
					{
						index: true,
						element: <SingleBlog />,
						errorElement: <ErrorElement />,
					},
					{
						path: "form",
						element: <BlogForm />,
						errorElement: <ErrorElement />,
					},
				],
			},
			{
				path: "support",
				element: <Support />,
				errorElement: <ErrorElement />,
			},
		],
	},
]);

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;

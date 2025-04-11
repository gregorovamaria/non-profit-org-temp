import React from "react";
import { useDispatch, useSelector } from "react-redux";

// components
import { BlogsGrid, BlogsList } from "../../components";

// utils & data & state
import { toggleLayout } from "../../features/blogs/blogsSlice";

// icons
import { BsFillGridFill, BsList } from "react-icons/bs";

const BlogsContainer = () => {
	const dispatch = useDispatch();
	const { layout, totalCount } = useSelector((store) => store.blogsState);

	const count = totalCount;

	const setActiveStyles = (pattern) => {
		return `text-xl btn btn-circle btn-sm ${
			pattern == layout
				? "btn-primary text-white"
				: "btn-ghost text-based-content"
		}`;
	};

	return (
		<>
			{/* HEADER */}
			<div className="flex justify-between items-center mt-8 border-b border-base-300 pb-5">
				<h4 className="font-medium text-md">
					{count} {count === 1 ? `blog` : `blogs`}
				</h4>
				<div className="flex gap-x-2">
					<button
						type="button"
						onClick={() => {
							dispatch(toggleLayout("grid"));
						}}
						className={setActiveStyles("grid")}
					>
						<BsFillGridFill />
					</button>
					<button
						type="button"
						onClick={() => {
							dispatch(toggleLayout("list"));
						}}
						className={setActiveStyles("list")}
					>
						<BsList />
					</button>
				</div>
			</div>

			{/* BLOGS */}
			<div>
				{count === 0 ? (
					<h5 className="text-2xl mt-16">
						Any blog fulfills the search criteria...
					</h5>
				) : layout === "grid" ? (
					<BlogsGrid />
				) : (
					<BlogsList />
				)}
			</div>
		</>
	);
};

export default BlogsContainer;

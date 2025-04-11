import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// components
import {
	SectionTitle,
	BlogsContainer,
	Filters,
	PaginationContainer,
} from "../components";

// state
import { openModal } from "../features/modal/modalSlice";
import { getBlogsLocal } from "../utils/index_local";

// icons
import { MdOutlineLibraryAdd } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import { setTotalCount } from "../features/blogs/blogsSlice";

// Loader
export const loader =
	(store) =>
	async ({ request }) => {
		const params = Object.fromEntries([
			...new URL(request.url).searchParams.entries(),
		]);

		const { lastVisible, page, direction } = store.getState().paginationState;

		let blogsDetails;

		if (import.meta.env.VITE_SOURCE != "local") {
			const blogsDetailsFirebase = await (
				await import("../utils")
			).getBlogs({
				params,
				lastVisible,
				page,
				direction,
			});
			blogsDetails = blogsDetailsFirebase;
		} else {
			let blogs = await getBlogsLocal({
				params,
				lastVisible,
				page,
				direction,
			});
			const blogsDetailsLocal = {
				results: blogs,
				totalCount: blogs.length,
				newLastVisible: "",
			};

			blogsDetails = blogsDetailsLocal;
		}

		const count = blogsDetails.totalCount;
		store.dispatch(setTotalCount(count));

		return { blogsDetails, params };
	};

const Blogs = () => {
	const dispatch = useDispatch();
	const { user } = useSelector((store) => store.userState);
	const { totalCount } = useSelector((store) => store.blogsState);

	const sectionTitle =
		totalCount < 1 ? (
			<SectionTitle text="No Blogs..." className="align-element pt-16 pb-16" />
		) : (
			<SectionTitle text="Blogs..." className="" />
		);

	return (
		<main>
			<section className="section">
				<div className="align-element">
					{/* HEADER */}
					<div className="grid justify-between grid-cols-[minmax(200px,800px)_auto] gap-4 items-center">
						{/* TITLE */}
						{/* <SectionTitle text="Blogs..." className="" /> */}
						{sectionTitle}
						{/* ADD & DELETE ALL BUTTONS */}
						{user && (
							<div className={user && `h-full grid grid-cols-2 gap-2`}>
								{/* ADD BUTTON */}
								<Link to="/blogs/new" className="md:hidden hover:text-primary">
									<MdOutlineLibraryAdd className="h-6 w-6" />
								</Link>
								<Link to="/blogs/new" className="hidden md:block">
									<button className="btn btn-outline btn-primary">
										Add new blog
									</button>
								</Link>

								{/* DELETE BUTTON */}
								<label
									htmlFor="my_modal"
									className="hover:text-error cursor-pointer md:hidden"
									onClick={() => {
										dispatch(openModal({ type: "all" }));
									}}
								>
									<FaRegTrashCan className="h-5 w-5" />
								</label>
								<label
									htmlFor="my_modal"
									className="btn btn-outline btn-error hidden md:flex"
									onClick={() => {
										dispatch(openModal({ type: "all" }));
									}}
								>
									Delete all
								</label>
							</div>
						)}
					</div>

					{/* FILTERS */}
					<Filters />

					{/* BLOGS */}
					<BlogsContainer />

					{/* PAGINATION */}
					<PaginationContainer />
				</div>
			</section>
		</main>
	);
};

export default Blogs;

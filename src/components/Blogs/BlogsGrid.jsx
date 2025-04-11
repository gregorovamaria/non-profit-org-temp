import React from "react";
import { useSelector } from "react-redux";
import { Link, useLoaderData } from "react-router-dom";

// components
import { EditDeleteBtn } from "../../components";
import { getImagesLocal } from "../../utils/index_local";

const BlogsGrid = () => {
	const { blogsDetails } = useLoaderData();
	const { user } = useSelector((store) => store.userState);
	let source = null;

	return (
		<article className="mt-12 grid gap-6 justify-items-center md:grid-cols-2 lg:grid-cols-3">
			{blogsDetails.results.map((blog, index) => {
				const { id, alt, title, info, author, date } = blog;

				if (import.meta.env.VITE_SOURCE != "local") {
					import("../../utils").downloadImages(id, "1", index);
				} else {
					const imagesByBlogID = getImagesLocal();
					source = imagesByBlogID[id][0];
				}

				const formattedInfo = `${
					info.blocks[0].text.length <= 50
						? info.blocks[0].text
						: info.blocks[0].text.slice(0, 50) + "..."
				}`;

				return (
					<div key={id} className="relative">
						{/* EDIT & DELETE BUTTONS */}
						{user && <EditDeleteBtn id={id} />}

						{/* REDIRECT TO SINGLE BLOG */}
						<Link to={`/blogs/${id}`} key={id}>
							<div className="card w-80 shadow-md hover:shadow-xl duration-300 group">
								{/* CARD IMAGE */}
								<figure>
									<img
										id={`image${index}`}
										alt={alt}
										className="w-40 h-40 mt-10 rounded-lg object-cover object-center group-hover:scale-105 transition duration-300"
										src={source ? source : `image${index}`}
									/>
								</figure>

								{/* CARD BODY */}
								<div className="card-body">
									{/* TITLE */}
									<div className="card-title text-primary font-bold capitalize">
										{title}
									</div>

									{/* SHORTENED DETAILS */}
									<p className="text-sm">{formattedInfo}</p>

									{/* AUTHOR && DATE */}
									<div className="pt-4 flex flex-wrap justify-between items-center text-xs">
										<span className="font-bold">{author}</span>
										<span>{date}</span>
									</div>
								</div>
							</div>
						</Link>
					</div>
				);
			})}
		</article>
	);
};

export default BlogsGrid;

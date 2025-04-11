import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

// state
import { openModal } from "../../features/modal/modalSlice";
import { toggleForm } from "../../features/blogs/blogsSlice";

// icons
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";

const EditDeleteBtn = ({ id }) => {
	const dispatch = useDispatch();

	return (
		<div className="flex justify-end gap-2 absolute right-2 top-2 z-10">
			<Link
				to={`/blogs/${id}`}
				className="hover:text-primary hover:scale-110 transition duration-300"
				onClick={() => dispatch(toggleForm(true))}
			>
				<FaRegEdit />
			</Link>
			<label
				htmlFor="my_modal"
				className="cursor-pointer hover:text-error hover:scale-110 transition duration-300"
				onClick={() => {
					dispatch(openModal({ type: "singleBlog", id: id }));
				}}
			>
				<FaRegTrashCan />
			</label>
		</div>
	);
};

export default EditDeleteBtn;
